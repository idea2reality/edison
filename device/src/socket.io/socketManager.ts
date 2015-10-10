import * as io from 'socket.io-client';
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
            console.log('+++ Socket.io connected');
            this.socket.emit('auth', id, (data) => {
                if (!data.success) {
                    console.log('--- FATAL: Authentication fail because of "%s"', data.msg);
                    process.exit(1);
                }
            });
        });

        this.socket.on('error', (err) => {
            console.log('--- Socket.io error', err, this.socket.connected);
            process.exit(1);
        });

        this.socket.on('disconnect', () => {
            console.log('--- Socket.io disconnected');
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
