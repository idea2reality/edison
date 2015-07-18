import {log, findLatestLogs} from '../db/api';
import userManager from '../users/userManager';
import assign = require('object.assign');
import {ObjectID} from 'mongodb';

class Edison {
    private _id: ObjectID;
    private id: string;
    private isAlive: boolean;
    private socket: SocketIO.Socket;
    private logCache: any[]

    /**
    * @param data - Data from DB
    */
    constructor(dbData) {
        if (!(dbData._id instanceof ObjectID))
            throw Error('Edison instance can be created only by data form db');

        assign(this, dbData);

        this.id = dbData._id.toString();
        this.isAlive = false;
        this.logCache = [];

        findLatestLogs(this.getObjectId())
            .then((logs) => logs.forEach((log) => this.logCache.push(log)));
    }

    alive(): boolean {
        return this.isAlive;
    }

    getId(): string {
        return this.id;
    }

    getObjectId(): ObjectID {
        return this._id;
    }

    getLatestLogs(): any[] {
        return this.logCache;
    }

    toJSON(): any {
        var obj: any = {};
        assign(obj, this);
        delete obj.socket;
        delete obj._id;
        return obj
    }

    setSocket(socket: SocketIO.Socket) {
        if (this.socket && this.socket.connected)
            this.socket.disconnect();

        this.socket = socket;
        this.isAlive = this.socket.connected;

        this.socket.on('log', (data) => {
            this.updateLogCache(data);
            userManager.notifyEdisonLog(this.id, data);
            log(this, data);
        });

        this.socket.on('disconnect', () => {
            console.log('--- Edison "%s" disconnected', this.id);
            this.isAlive = this.socket.connected;
            userManager.notifyEdisonUpdate(this.id, this.toJSON());
        });

        this.socket.on('error', () => {
            this.socket.disconnect();
            console.log('--- Socket error on Edison "%s": connected =', this.id, this.socket.connected)
        });

        userManager.notifyEdisonUpdate(this.id, this.toJSON());
    }

    private updateLogCache(log) {
        this.logCache.shift();
        this.logCache.push(log);
    }
}

export default Edison;
