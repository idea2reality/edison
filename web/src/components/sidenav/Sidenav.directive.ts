/// <reference path="./Sidenav.controller.ts"/>

namespace i2r.sidenav {

    class SidenavDirective implements ng.IDirective {

        static instance(): ng.IDirective {
            return new SidenavDirective();
        }
        constructor() { }

        restrict = 'E';
        templateUrl = 'templates/sidenav.tpl.html';
        controller = SidenavController;
        controllerAs = 'sl';
        bindToController = true;
        replace = true;
    }

    angular.module('sidenav.directive', ['sidenav.directive.edisonButton'])
        .directive('i2rSidenav', [SidenavDirective.instance]);
}
