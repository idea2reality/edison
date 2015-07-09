module common {

    export class SocketService {
        private socket: SocketIOClient.Socket;

        constructor() {
            this.socket = io.connect('http://localhost:8080/users');
        }

        getSocket(): SocketIOClient.Socket {
            return this.socket;
        }
    }

    angular.module('common.services.socket', [])
        .service('socketService', SocketService);
}
