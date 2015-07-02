module views {
    class UserDetailContoller {

        private selected = null

        constructor(
            private $scope,
            private userService: common.UserService,
            private $mdBottomSheet,
            private $log,
            private $routeParams
            ) {
            userService
                .loadAllUsers()
                .then((users) => {
                    for (var i = 0; i < users.length; i++) {
                        var user = users[i];
                        if (user.name == $routeParams.userName) {
                            this.selected = user;
                            break;
                        }
                    }
                });
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
            }).then((clickedItem) => {
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

    angular.module('views.userDetail', [])
        .controller('UserDetailController', UserDetailContoller);
}