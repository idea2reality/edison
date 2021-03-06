namespace i2r.common {

    export class EdisonService {

        private socket: SocketIOClient.Socket;
        private edisons: Edison[];
        private edisonMap: Map<string, Object>;
        private edisonListPromise: ng.IPromise<Edison[]>;

        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $rootScope: ng.IRootScopeService,
            private $mdToast,
            socketService: i2r.common.SocketService
        ) {
            this.socket = socketService.getSocket();
            this.edisons = [];
            this.edisonMap = new Map();

            this.fetch();

            this.socket.on('edison-update', (id, edisonData) => {
                this.$mdToast.show(
                    this.$mdToast.simple()
                        .content(edisonData.name + ' is ' + (edisonData.isAlive ? 'ALIVE' : 'DEAD'))
                        .position('top right')
                        .hideDelay(3000));
            });
        }

        get(id): ng.IPromise<Edison> {
            return this.edisonListPromise.then(() => { return this.edisonMap.get(id) });
        }

        getEdisons(): ng.IPromise<Edison[]> {
            return this.edisonListPromise;
        }

        getLatestLog(edisonId: string): ng.IPromise<any[]> {
            return this.$http.get('/edisons/' + edisonId + '/latest-logs')
                .then((res) => { return res.data });
        }

        private setEdisons(edisonData: any[]): void {
            edisonData.forEach(data =>
                this.edisons.push(new Edison(data, this.socket, this, this.$rootScope, this.$q, this.$http)));
            this.setEdisonMap();
        }

        private setEdisonMap(): void {
            this.edisons.forEach(edison => this.edisonMap.set(edison.getId(), edison));
        }

        private fetch(): void {
            this.edisonListPromise = this.$http.get('/edisons')
                .then((res: any) => {
                    this.setEdisons(res.data);
                    return this.edisons;
                });
        }
    }

    angular.module('common.service.edison', ['common.service.socket'])
        .service('edisonService', EdisonService);
}
