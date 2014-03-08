angular.module('drankly.controllers')
	.controller('InfoWindowCtrl', function($scope, $rootScope) {
		$scope.showInfoWindow = false;

		$rootScope.$on('markerSelected', function() {
			$scope.showInfoWindow = !$scope.showInfoWindow;
		});
	});