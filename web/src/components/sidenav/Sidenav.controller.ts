namespace i2r.sidenav {

    export class SidenavController {

        private selected: string = null;
        private users = [];
        private edisons: i2r.common.Edison[];

        constructor(
            private $scope: ng.IScope,
            private edisonService: i2r.common.EdisonService,
            private $mdSidenav,
            private $log
            ) {
            this.edisonService.getEdisons()
                .then((edisons) => this.edisons = edisons);
        }

        toggleUsersList() {
            this.$mdSidenav('left').toggle();
        }

        selectUser(edison) {
            this.selected = edison.id;
            this.toggleUsersList();
        }
    }

    angular.module('sidenav.controller', [])
        .controller('SidenavController', SidenavController);
}
