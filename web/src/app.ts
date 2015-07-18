
angular
    .module('starterApp', ['ngRoute', 'ngMaterial', 'common', 'components', 'views'])
    .config(($mdThemingProvider, $mdIconProvider) => {

        $mdIconProvider
            .defaultIconSet("./assets/svg/avatars.svg", 128)
            .icon("menu", "./assets/svg/menu.svg", 24)
            .icon("share", "./assets/svg/share.svg", 24)
            .icon("google_plus", "./assets/svg/google_plus.svg", 512)
            .icon("hangouts", "./assets/svg/hangouts.svg", 512)
            .icon("twitter", "./assets/svg/twitter.svg", 512)
            .icon("phone", "./assets/svg/phone.svg", 512);

        $mdThemingProvider.theme('default');
        // .primaryPalette('brown')
        // .accentPalette('red');

    })
    .config(($routeProvider: ng.route.IRouteProvider) => {
        $routeProvider
            .when('/home', {
                templateUrl: '/views/home.view.html',
                controller: 'HomeViewController',
                controllerAs: 'hvc'
            })
            .when('/edisons/:edisonId', {
                templateUrl: '/views/edison.view.html',
                controller: 'EdisonViewController',
                controllerAs: 'evc'
            })
            .otherwise('/home');
    })
    .run((
        socketService: common.SocketService,
        googleChartService: googleChart.GoogleChartService,
        edisonService: common.EdisonService,
        $log: ng.ILogService
        ) => {

        socketService
            .getSocket()
            .on('connect', (res) => $log.debug('+++ Socket.io connected', res));

        googleChartService
            .onLoad()
            .then(() => $log.debug('+++ Google Chart API script loaded'));

        window['edisonService'] = edisonService;
    });
