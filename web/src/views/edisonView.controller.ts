namespace i2r.views {
    class EdisonViewController {

        private edison: i2r.common.Edison;
        private log: any;
        private timer;

        private color: number[];
        private sw1: boolean;
        private sw2: boolean;
        private sw3: boolean;

        constructor(
            private $scope,
            private edisonService: i2r.common.EdisonService,
            private $mdBottomSheet,
            private $log,
            private $routeParams,
            private socketService: i2r.common.SocketService,
            private $mdToast
        ) {
            this.edisonService.get($routeParams.edisonId)
                .then(edison => this.setEdison(edison));

            this.color = [
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255),
                Math.floor(Math.random() * 255)
            ];
        }

        setLed(ledId, status) {
            if (this.timer != undefined)
                clearTimeout(this.timer);

            this.timer = setTimeout(() =>
                this.edison.setLed(ledId, status)
                    .then((res) => {
                        var toast = this.$mdToast.simple()
                            .position('top right')
                            .hideDelay(1000);

                        if (res.success)
                            toast.content('Success!');
                        else
                            toast.content('Fail! ' + res.msg);

                        this.$mdToast.show(toast);
                    })
                , 400);
        }

        private setEdison(edison) {
            this.edison = edison;
        }
    }

    angular.module('views.edison', [])
        .controller('EdisonViewController', EdisonViewController);
}
