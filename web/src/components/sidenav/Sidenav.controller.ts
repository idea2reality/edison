module sidenav {

    export class SidenavController {

        private selected = null;
        private users = [];

        constructor(
            private $scope: SidenavScope,
            private userService: common.UserService,
            private $mdSidenav,
            private $log
            ) {
            this.userService
                .loadAllUsers()
                .then((users) => {
                    this.users = [].concat(users);
                    this.selected = users[0];
                });

            this.userService.onUserListUpdate((users) => {
                $scope.$apply(() => {
                    this.users = users;
                })
            });
        }

        toggleUsersList() {
            this.$mdSidenav('left').toggle();
        }

        selectUser(user) {
            this.selected = angular.isNumber(user) ? this.users[user] : user;
            this.toggleUsersList();
        }
    }

    interface SidenavScope extends ng.IScope {
        users: any[];
    }

    angular.module('sidenav.controller', [])
        .controller('SidenavController', SidenavController);
}
