import {io} from '../app';
import Edison from '../common/edison.class';

class UserManager {
    private users: SocketIO.Namespace;

    constructor(io) {
        this.users = io.of('/users');
        this.users.on('connect', (socket) => console.log('+++ New USER socket connection'));
    }

    notifyEdisonUpdated(id: string, edisonData: any) {
        this.users.emit('edison-update', id, edisonData);
    }
}

var userManager = new UserManager(io);

export default userManager;
