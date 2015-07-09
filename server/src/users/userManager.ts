import {io} from '../app';
import Edison from '../common/edison.class';

class UserManager {
    private users: SocketIO.Namespace;

    constructor(io: SocketIO.Server) {
        this.users = io.of('/users');
        this.users.on('connect', (socket) => {
            console.log('+++ New USER socket connection');

            socket.on('edison-log', (id) => {
                socket.rooms.forEach((room) => socket.leave(room));
                socket.join(id);
            })
        });


    }

    notifyEdisonUpdate(id: string, edisonData: any) {
        this.users.emit('edison-update', id, edisonData);
    }

    notifyEdisonLog(id: string, log: any) {
        this.users.in(id).emit('log', log)
    }
}

var userManager = new UserManager(io);

export default userManager;
