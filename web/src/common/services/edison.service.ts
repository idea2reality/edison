module common {
    export class Edison {

        private id: string;
        private name: string;
        private isAlive: boolean;

        constructor(
            data,
            private socket: SocketIOClient.Socket,
            private $rootScope: ng.IRootScopeService
            ) {
            $.extend(this, data);

            this.socket.on('edison-update', (id: string, edisonData: any) => {
                if (this.id != id) return;
                $.extend(this, edisonData);
                this.$rootScope.$apply();
            })
        }

        getId(): string {
            return this.id;
        }

        alive(): boolean {
            return this.isAlive;
        }

        onLog(listener: (log) => void) {
            this.socket.off('log');
            this.socket.emit('edison-log', this.id);
            this.socket.on('log', (log) => listener(log));
        }
    }

    export class EdisonService {

        private socket: SocketIOClient.Socket;
        private edisons: Edison[];
        private edisonMap: Map<string, Object>;
        private edisonListPromise: ng.IPromise<Edison[]>;

        constructor(
            private $q: ng.IQService,
            private $http: ng.IHttpService,
            private $rootScope: ng.IRootScopeService,
            socketService: common.SocketService
            ) {
            this.socket = socketService.getSocket();
            this.edisons = [];
            this.edisonMap = new Map();

            this.fetch();
        }

        get(id): ng.IPromise<Edison> {
            return this.edisonListPromise.then(() => { return this.edisonMap.get(id) });
        }

        getEdisons(): ng.IPromise<Edison[]> {
            return this.edisonListPromise;
        }

        private setEdisons(edisonData: any[]): void {
            edisonData.forEach(data => this.edisons.push(new Edison(data, this.socket, this.$rootScope)));
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

    angular.module('common.services.edison', ['common.services.socket'])
        .service('edisonService', EdisonService);
}
