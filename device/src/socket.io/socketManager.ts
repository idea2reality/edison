import * as io from 'socket.io-client';
import config from '../config';

class SocketManager {
    private socket: SocketIOClient.Socket;

    constructor() {
        this.socket = io.connect(config.host, { 'force new connection': true })
    }

    sendData(data): Promise<any> {
        return new Promise<any>((resolve, reject) => {
            if (!this.socket.connected)
                return reject(new Error('Socket disconnected'));

            this.socket.emit('log', data);
            resolve();
        });
    }

    private setSocket() {
        this.socket.on('connect', () => {
            console.log('+++ Socket.io connected');
            this.socket.emit('auth', config.id, (data) => {
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
}

var socketManager = new SocketManager();

export default socketManager;
