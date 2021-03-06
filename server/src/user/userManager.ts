import {io} from '../app';
import Edison from '../edison/Edison';

class UserManager {
  private users: SocketIO.Namespace;

  constructor(io: SocketIO.Server) {
    this.users = io.of('/users');
    this.users.on('connect', (socket) => {
      console.log('+++ New USER socket connection');

      var currentRoom: string;
      socket.on('edison-log', (id) =>
        socket.leave(currentRoom, () => socket.join(id)));
    });
  }

  notifyEdisonUpdate(id: string, edisonData: any) {
    this.users.emit('edison-update', id, edisonData);
  }

  notifyEdisonLog(id: string, log: any) {
    this.users.in(id).emit('log', log)
  }

  private static instance: UserManager;

  static getInstance() {
    if (UserManager.instance === undefined)
      UserManager.instance = new UserManager(io);

    return UserManager.instance;
  }
}

export default UserManager.getInstance();
