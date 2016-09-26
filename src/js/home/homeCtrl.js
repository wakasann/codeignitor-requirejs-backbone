define(function (require) {
    var app = require('app');

    app.controller('homeCtrl', ['$scope', function($scope) {
      console.log("aaa111");
        $scope.name = 'Home';
    }]);
});