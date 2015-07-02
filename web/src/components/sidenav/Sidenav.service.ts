module sidenav {
    class SidenavActionService {
        static $inject = ['$mdSidenav'];
        constructor(private $mdSidenav) { }

        toggle() {
            this.$mdSidenav('left').toggle();
        }
    }

    angular.module('sidenav.service', [])
        .service('sidenav.service.action', SidenavActionService);
}
