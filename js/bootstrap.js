require.config({
    baseUrl: "./js",
    paths: {
        'angular': 'angular/angular.min',
        'angular-ui-router': 'angular/vendor/angular-ui-router.min',
        'angular-async-loader': 'angular/angular-async-loader'
    },
    shim: {
        'angular': {exports: 'angular'},
        'angular-ui-router': {deps: ['angular']}
    }
});

require(['angular', 'app.router'], function (angular) {
    angular.element(document).ready(function () {
        angular.bootstrap(document, ['ezdiyApp']);
        angular.element(document).find('html').addClass('ng-app');
    });
});
