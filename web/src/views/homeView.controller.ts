namespace i2r.views {
    class HomeViewController {

        private aliveEdisons: i2r.common.Edison[];

        constructor(
            private $scope
            ) { }

    }

    angular.module('views.home', [])
        .controller('HomeViewController', HomeViewController);
}
