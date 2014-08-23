angular.module('drankly.controllers').controller('SearchCtrl', function ($scope, $rootScope) {
    $scope.findBars = function () {
        $rootScope.$broadcast('findBars');
    };

    $scope.findAtm = function () {
        $rootScope.$broadcast('findAtm');
    };

    $scope.reset = function () {
        $rootScope.$broadcast('reset');
    };
});