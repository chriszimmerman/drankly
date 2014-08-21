angular.module('drankly.controllers').controller('OptCtrl', function($scope, $rootScope){
	$scope.barsEnabled = function() {
		$rootScope.$broadcast("barsEnabledChanged", $scope.barsEnabled);
	};
});