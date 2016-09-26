define(function(require) {
    var app = require('app');

    app.run(['$state', '$stateParams', '$rootScope', function ($state, $stateParams, $rootScope) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }]);

    app.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider,$locationProvider) {
        $urlRouterProvider.otherwise('/home');

        $stateProvider
            .state('home', {
                url: '/home',
                templateUrl: 'dist/views/home/home.html',
                 // new attribute for ajax load controller
                controllerUrl: 'home/homeCtrl',
                controller: 'homeCtrl'
            });

        //$locationProvider.html5Mode(!0)
    }]);
});
