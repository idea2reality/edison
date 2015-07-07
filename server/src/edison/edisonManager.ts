import {io} from '../app';
import Edison from './edison.class';
import EdisonMap from './edisonMap.class';
import * as edisonDb from '../db/edison/index';

class EdisonManager {
    private edisonMap: EdisonMap;
    private io: SocketIO.Server;

    constructor(io) {
        this.edisonMap = new EdisonMap();
        this.io = io;
        this.config();

        console.log('+++ Edison Manager created');
    }

    onEdisonListUpdate(listener: (id: string, edison: Edison) => void) {
        this.edisonMap.onUpdate(listener);
    }

    private config() {
        this.io
            .of('/edisons')
            .on('connect', (socket) => {
                console.log('+++ New EDISON socket connection');


                socket.on('auth', (id, fn) =>
                    edisonDb.has(id).then((authorized) => {
                        if (!authorized) {
                            fn({ success: false, msg: 'You are not authorized' });
                            socket.disconnect();
                            console.log('--- Unauthorized edison socket "%s" disconnected', id);
                            return;
                        }

                        // Authorized
                        this.edisonMap.set(id, new Edison(id, socket));

                        socket.on('error', (err) => {
                            this.edisonMap.delete(id);
                        });

                        socket.on('disconnect', () => {
                            this.edisonMap.delete(id)
                        });

                        socket.join(id);

                        fn({ success: true });
                    }));


            });
    }
}

var edisonManager = new EdisonManager(io);

export default edisonManager;
