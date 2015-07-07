module common {

    export class SocketService {
        private socket = io.connect('http://localhost:8080/users');

        constructor() { }

        getSocket(): SocketIOClient.Socket {
            return this.socket;
        }
    }

    angular.module('common.services.socket', [])
        .service('socketService', SocketService);
}
