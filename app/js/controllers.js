angular.module("drankly.controllers", [])
    .controller("SearchCtrl", function ($scope, $rootScope) {
        $scope.isActive = false;
        $scope.toggleActive = function () {
            $scope.isActive = !$scope.isActive;
        };

        $scope.findBars = function () {
            $rootScope.$broadcast("findBars");
        };

        $scope.reset = function () {
            $rootScope.$broadcast("reset");
        };
    })

    .controller("MapCtrl", function ($scope, $rootScope, geolocation, ngGPlacesAPI) {
        $scope.map = {
            center: { latitude: 0, longitude: 0 },
            zoom: 0,
            markers: []
        };

        $scope.setCenter = function () {
            geolocation.getLocation().then(function (position) {
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

        $rootScope.$on("reset", function () {
            $scope.setCenter();
        });

        $rootScope.$on("findBars", function () {
            ngGPlacesAPI.nearbySearch({
                latitude: $scope.map.center.latitude,
                longitude: $scope.map.center.longitude,
                radius: 1000,
                types: ["bar"],
            }).then(function (places) {
                $scope.map.markers = [];
                $scope.map.markers.push($scope.map.center);

                for (var i = 0; i < places.length; i++) {
                    $scope.map.markers.push({
                        latitude: places[i].geometry.location.d,
                        longitude: places[i].geometry.location.e
                    });
                }
            });
        });
    });