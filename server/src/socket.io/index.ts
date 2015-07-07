import users from './users/index';
import edisons from './edisons/index';

function init(io: SocketIO.Server) {
    users(io.of('/users'));
    edisons(io.of('/edisons'));
}

export {init};
