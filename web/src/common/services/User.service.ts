module common {

    export class UserService {

        private userCache = null;
        private isFetching = false;
        private fetchingPromise = null;
        private userListUpdateListeners = [];
        private socket;

        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            socketService: common.SocketService
            ) {
            this.socket = socketService.getSocket();
            this.socket.on('edison-list-update',
                (res) => this.userListUpdateListeners.forEach((listener) => listener(res)));
        }

        loadAllUsers(): ng.IPromise<any[]> {
            if (this.userCache == null)
                return this.fetch();
            return this.$q.when(this.userCache);
        }

        onUserListUpdate(listener: (users: any[]) => void) {
            this.userListUpdateListeners.push(listener);
        }

        private fetch() {
            if (this.isFetching)
                return this.fetchingPromise

            this.isFetching = true;
            this.fetchingPromise = this.$http.get('/users')
                .then((res) => {
                    this.isFetching = false;
                    return res.data;
                })
                .then((users) => this.userCache = users);

            return this.fetchingPromise;
        }
    }

    angular.module('common.services.user', [])
        .service('userService', UserService);
}
