module common {

    export class SocketService {
        private socket: SocketIOClient.Socket;

        constructor(
            private $rootScope: ng.IRootScopeService,
            private $q: ng.IQService
            ) {
            this.socket = io.connect('http://localhost:8080/users');
        }

        getSocket(): SocketIOClient.Socket {
            return this.socket;
        }

        on(eventName: string, listener: Function) {
            this.socket.on(eventName, (...args) =>
                this.$rootScope.$apply(() => listener.apply(null, args)));
        }
    }

    angular.module('common.service.socket', [])
        .service('socketService', SocketService);
}
