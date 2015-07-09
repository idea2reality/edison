module sidenav {

    class EdisonButtomDirective implements ng.IDirective {

        static instance(sidenavService): ng.IDirective {
            return new EdisonButtomDirective(sidenavService);
        }
        constructor(private sidenavService: SidenavService) { }

        restrict = 'E';
        templateUrl = 'templates/edisonButton.tpl.html';
        scope = {
            edison: '=',
            selected: '='
        }
        link = ($scope) => {
            $scope.select = () => {
                this.sidenavService.toggle();
                $scope.selected = $scope.edison.id;
            }
        }
    }

    angular.module('sidenav.directive.edisonButton', [])
        .directive('i2rEdisonButton', EdisonButtomDirective.instance);
}
