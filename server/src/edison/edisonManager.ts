import {io} from '../app';
import Edison from './Edison';
import EdisonMap from './edisonMap';
import * as edisonDb from '../db';

class EdisonManager {
  private edisonMap: EdisonMap;
  private io: SocketIO.Server;

  constructor(io) {
    this.edisonMap = new EdisonMap();
    this.io = io;
    this.config();
  }

  getEdison(edisonId: string): Edison {
    return this.edisonMap.get(edisonId);
  }

  getLatestLogs(edisonId: string): any[] {
    return this.getEdison(edisonId).getLatestLogs();
  }

  getEdisons(): Edison[] {
    return this.edisonMap.toJSON();
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

  private static instance: EdisonManager;

  static getInstance(): EdisonManager {
    if (EdisonManager.instance === undefined)
      EdisonManager.instance = new EdisonManager(io);
      
    return EdisonManager.instance;
  }
}

export default EdisonManager.getInstance();
