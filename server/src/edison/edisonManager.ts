import {io} from '../app';
import Edison from '../common/edison.class';
import EdisonMap from './edisonMap.class';
import * as edisonDb from '../db/edison/index';

class EdisonManager {
    private edisonMap: EdisonMap;
    private io: SocketIO.Server;

    constructor(io) {
        this.edisonMap = new EdisonMap();
        this.io = io;
        this.config();
    }

    getEdisons(): Edison[] {
        return this.edisonMap.toArray();
    }

    private config() {
        this.io
            .of('/edisons')
            .on('connect', (socket) => {
                console.log('+++ New EDISON socket connection');

                socket.on('auth', (id: string, fn) => {
                    if (!this.edisonMap.has(id)) {
                        fn({ success: false, msg: 'You are not authorized' });
                        socket.disconnect();
                        console.log('--- Unauthorized edison socket "%s" disconnected', id);
                        return;
                    }

                    // Authorized
                    this.edisonMap.get(id).setSocket(socket);
                    socket.join(id);

                    fn({ success: true });
                });
            });
    }
}

var edisonManager = new EdisonManager(io);

export default edisonManager;
