import * as io from 'socket.io-client';
import * as winston from 'winston';
import {id, host} from '../config';


class SocketManager {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect(host, { 'force new connection': true });
        this.initialize();
    }

    onSetLed(listener: (ledId, status: number[] | boolean, ack: Function) => void) {
        this.socket.on('set-led', listener);
    }

    sendData(data): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.socket.connected)
                return reject(new Error('Socket disconnected'));

            this.socket.emit('log', data);
            resolve();
        });
    }

    private initialize() {
        this.socket.on('connect', () => {
            winston.info('[socket.io] SocketManager: Connected');
            this.socket.emit('auth', id, (data) => {
                if (!data.success) {
                    winston.error('[socket.io] SocketManager: Authentication fail because of ' + data.msg);
                    process.exit(1);
                }
            });
        });

        this.socket.on('error', (err) => {
            winston.error('[socket.io] SocketManager: ' + err);
            process.exit(1);
        });

        this.socket.on('disconnect', () => {
            winston.error('[socket.io] SocketManager: disconnected');
            process.exit(1);
        });
    }


    private static instance: SocketManager;

    static getInstance(): SocketManager {
        if (SocketManager.instance === undefined)
            SocketManager.instance = new SocketManager();

        return SocketManager.instance;
    }
}

export default SocketManager.getInstance();
