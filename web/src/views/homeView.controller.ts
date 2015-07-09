module views {
    class HomeViewController {

        private aliveEdisons: common.Edison[];

        constructor(
            private $scope
            ) { }

    }

    angular.module('views.home', [])
        .controller('HomeViewController', HomeViewController);
}
