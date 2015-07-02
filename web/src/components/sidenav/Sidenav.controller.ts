module sidenav {

    export class SidenavController {

        private selected = null
        private users = []

        constructor(
            private $scope,
            private userService: common.UserService,
            private $mdSidenav,
            private $log
            ) {
            userService
                .loadAllUsers()
                .then((users) => {
                    this.users = [].concat(users);
                    this.selected = users[0];
                });
        }

        toggleUsersList() {
            this.$mdSidenav('left').toggle();
        }

        selectUser(user) {
            this.selected = angular.isNumber(user) ? this.$scope.users[user] : user;
            this.toggleUsersList();
        }
    }

    angular.module('sidenav.controller', [])
        .controller('SidenavController', SidenavController);
}
