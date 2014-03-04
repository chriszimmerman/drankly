var ctrls = angular.module('drankly.controllers', ['drankly.services']);

ctrls.controller('SearchCtrl', function($scope, $rootScope) {
	$scope.findBars = function() {
		$rootScope.$broadcast('findBars');
	};

	$scope.findAtm = function() {
		$rootScope.$broadcast('findAtm');
	};

	$scope.reset = function() {
		$rootScope.$broadcast('reset');
	};
});

ctrls.controller('MapCtrl', function($scope, $rootScope, geolocation, ngGPlacesAPI, MarkerSvc) {
	$scope.map = {
		center: {
			latitude: 0,
			longitude: 0
		},
		zoom: 0,
		markers: []
	};

	$scope.setCenter = function() {
		geolocation.getLocation().then(function(position) {
			$scope.map = {
				zoom: 15,
				center: {
					latitude: position.coords.latitude,
					longitude: position.coords.longitude
				}
			};

			$scope.map.markers = [{
				latitude: position.coords.latitude,
				longitude: position.coords.longitude
			}];
		});
	};

	$rootScope.$on('reset', function() {
		$scope.setCenter();
	});

	$rootScope.$on('findBars', function() {
		ngGPlacesAPI.nearbySearch({
			latitude: $scope.map.center.latitude,
			longitude: $scope.map.center.longitude,
			radius: 1000,
			openNow: true,
			types: ['bar'],
		}).then(function(places) {
			$scope.map.markers = MarkerSvc.createMarkers(places);
			$scope.map.markers.push($scope.map.center);
		});
	});

	$rootScope.$on('findAtm', function() {
		ngGPlacesAPI.nearbySearch({
			latitude: $scope.map.center.latitude,
			longitude: $scope.map.center.longitude,
			radius: 1000,
			types: ['atm'],
		}).then(function(places) {
			$scope.map.markers = MarkerSvc.createMarkers(places);
			$scope.map.markers.push($scope.map.center);
		})
	});
});