module sidenav {

    class UserController {

        private selected = null
        private users = []

        constructor(
            private $scope,
            private userService: common.UserService,
            private $mdSidenav,
            private $mdBottomSheet,
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

        share($event) {
            var user = this.selected;

            this.$mdBottomSheet.show({
                parent: angular.element(document.getElementById('content')),
                templateUrl: '/templates/contactSheet.tpl.html',
                controller: ['$mdBottomSheet', UserSheetController],
                controllerAs: "vm",
                bindToController: true,
                targetEvent: $event
            }).then(function(clickedItem) {
                this.$log.debug(clickedItem.name + ' clicked!');
            });

            /**
             * Bottom Sheet controller for the Avatar Actions
             */
            function UserSheetController($mdBottomSheet) {
                this.user = user;
                this.items = [
                    { name: 'Phone', icon: 'phone', icon_url: 'assets/svg/phone.svg' },
                    { name: 'Twitter', icon: 'twitter', icon_url: 'assets/svg/twitter.svg' },
                    { name: 'Google+', icon: 'google_plus', icon_url: 'assets/svg/google_plus.svg' },
                    { name: 'Hangout', icon: 'hangouts', icon_url: 'assets/svg/hangouts.svg' }
                ];
                this.performAction = function(action) {
                    $mdBottomSheet.hide(action);
                };
            }
        }
    }

    angular.module('sidenav.controller', [])
        .controller('UserController', UserController);
}
