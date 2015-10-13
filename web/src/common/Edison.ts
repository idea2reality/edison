namespace i2r.common {

    export class Edison {

        private id: string;
        private name: string;
        private isAlive: boolean;
        private logCache: any[];

        constructor(
            data,
            private socket: SocketIOClient.Socket,
            private edisonService: EdisonService,
            private $rootScope: ng.IRootScopeService,
            private $q: ng.IQService,
            private $http: ng.IHttpService
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

        getLatestLogs(): any[] {
            return this.logCache;
        }

        onLog(listener: (log) => void) {
            this.socket.off('log');
            this.socket.emit('edison-log', this.id);
            this.socket.on('log', listener);
            this.socket.on('log', (log) => this.updateLogCache(log));
        }

        setLed(ledId: string, status): ng.IPromise<any> {
            return this.$http.post('/edisons/' + this.id + '/set-led', { ledId: ledId, status: status })
                .then((res) => { return res.data; });
        }

        private updateLogCache(log) {
            this.logCache.shift();
            this.logCache.push(log);
        }
    }
}
