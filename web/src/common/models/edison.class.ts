module common {

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
            private $q: ng.IQService
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

        private updateLogCache(log) {
            this.logCache.shift();
            this.logCache.push(log);
        }
    }
}
