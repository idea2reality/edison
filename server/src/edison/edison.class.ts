import {log} from '../db/api';

class Edison {
    private id: string;
    private socket: SocketIO.Socket;
    private onLogListeners: Function[] = [];
    private onDisconnectListener: Function[] = [];

    constructor(id, socket) {
        this.id = id;
        this.socket = socket;
        this.config();
    }

    private config() {
        this.socket.on('log', (data) => {
            log(this.id, data);
            this.onLogListeners.forEach((listener) => listener(log));
        });

        this.socket.on('disconnect', () => {
            console.log('--- Edison "%s" disconnected', this.id);
            this.onDisconnectListener.forEach((listener) => listener())
        });

        this.socket.on('error', () => {
            this.socket.disconnect();
            console.log('--- Socket error on Edison "%s": connected =', this.id, this.socket.connected)
        });
    }

    onLog(listener: (log) => void) {
        this.onLogListeners.push(listener);
    }

    onDisconnect(listener: () => void) {
        this.onDisconnectListener.push(listener);
    }
}

export default Edison;
