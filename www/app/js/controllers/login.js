angular.module('drankly.controllers').controller('LoginCtrl', function($rootScope, $scope, $location, GooglePlus) {
    $scope.login = function() {
        GooglePlus.login().then(function() {
            GooglePlus.getUser().then(function(user) {
                $rootScope.user = user;
                $location.path("/");
            });
        }, function(err) {
            console.log(err);
        });
    }
});