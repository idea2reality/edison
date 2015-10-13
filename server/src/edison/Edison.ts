import {log, findLatestLogs} from '../db/api';
import userManager from '../users/userManager';
var assign = require('object.assign');
import {ObjectID} from 'mongodb';

class Edison {
    private _id: ObjectID;
    private id: string;
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
        this.logCache = [];

        findLatestLogs(this.getObjectId())
            .then((logs) => logs.forEach((log) => this.logCache.push(log)));
    }

    get isAlive() {
        if (this.socket)
            return this.socket.connected;
        return false;
    }

    setLed(ledId, status): Promise<any> {
        return new Promise((resolve, reject) => {
            if (!this.isAlive)
                return reject(new Error('Edison is NOT CONNECTED!'));
            this.socket.emit('set-led', ledId, status, (res) => resolve(res));
        });
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
        obj.isAlive = this.isAlive;
        return obj
    }

    setSocket(socket: SocketIO.Socket) {
        if (this.socket && this.socket.connected)
            this.socket.disconnect();

        this.socket = socket;

        this.socket.on('log', (data) => {
            this.updateLogCache(data);
            userManager.notifyEdisonLog(this.id, data);
            log(this, data);
        });

        this.socket.on('disconnect', () => {
            console.log('--- Edison "%s" disconnected', this.id);
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
