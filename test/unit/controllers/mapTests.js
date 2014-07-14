describe('controllers/map', function () {
    var scope, rootScope, geolocation, googlePlaces, geolocationDeferred, googlePlacesDeferred, fakeMarkerSvc;

    beforeEach(module('drankly.controllers'));

    beforeEach(inject(function ($rootScope, $controller, $q) {
        rootScope = $rootScope;
        scope = rootScope.$new();

        geolocation = {
            getLocation: function () {
                geolocationDeferred = $q.defer();
                return geolocationDeferred.promise;
            }
        };

        googlePlaces = {
            nearbySearch: function () {
                googlePlacesDeferred = $q.defer();
                return googlePlacesDeferred.promise;
            }
        };

        fakeMarkerSvc = {
            createMarkers: function () {
            }
        };
        $controller('MapCtrl', {
            $scope: scope,
            $rootScope: rootScope,
            geolocation: geolocation,
            ngGPlacesAPI: googlePlaces,
            MarkerSvc: fakeMarkerSvc
        });
    }));

    describe('when initialized', function () {
        it('should default map', function () {
            expect(scope.map).toEqual({
                center: {
                    longitude: 0,
                    latitude: 0
                },
                zoom: 0,
                markers: []
            });
        });
    });

    describe('when setCenter', function () {
        beforeEach(inject(function ($rootScope) {
            spyOn(geolocation, 'getLocation').and.callThrough();
            scope.setCenter();

            geolocationDeferred.resolve({
                coords: {
                    latitude: 1,
                    longitude: 2
                }
            });
            $rootScope.$digest();
        }));

        it('should set the map center', function () {
            expect(scope.map.center).toEqual({
                latitude: 1,
                longitude: 2
            });
        });

        it('should set the map zoom', function () {
            expect(scope.map.zoom).toEqual(15);
        });

        it('should set the markers', function () {
            expect(scope.map.markers).toEqual([{
                latitude: 1,
                longitude: 2
            }]);
        });
    });

    describe('when reset', function () {
        beforeEach(inject(function ($rootScope) {
            spyOn(scope, 'setCenter');
            $rootScope.$broadcast('reset');
        }));

        it('should setCenter', function () {
            expect(scope.setCenter).toHaveBeenCalled();
        });
    });

    describe('when findBars', function () {
        var expectedMarkers, expectedPlaces;
        beforeEach(inject(function ($rootScope) {
            scope.map = {
                center: {
                    latitude: 1,
                    longitude: 2
                },
                markers: [{
                    latitude: 1,
                    longitude: 2
                }, {
                    latitude: 98,
                    longitude: 99
                }]
            };

            expectedMarkers = [{
                latitude: 12,
                longitude: 23,
            }];

            expectedPlaces = [{
                geometry: {
                    location: {
                        d: 4,
                        e: 5
                    }
                }
            }];

            spyOn(googlePlaces, 'nearbySearch').and.callThrough();
            spyOn(fakeMarkerSvc, 'createMarkers').and.returnValue(expectedMarkers);
            $rootScope.$broadcast('findBars');

            googlePlacesDeferred.resolve(expectedPlaces);
            $rootScope.$digest();
        }));

        it('should search for bars', function () {
            expect(googlePlaces.nearbySearch).toHaveBeenCalledWith({
                latitude: 1,
                longitude: 2,
                radius: 1000,
                types: ['bar'],
                openNow: true
            });
        });

        it('should remove old markers', function () {
            expect(scope.map.markers).not.toContain({
                latitude: 98,
                longitude: 99
            });
        });

        it('should set new markers', function () {
            expect(fakeMarkerSvc.createMarkers).toHaveBeenCalledWith(expectedPlaces);
            expect(scope.map.markers).toContain(expectedMarkers[0]);
        });
    });

    describe('when findAtm', function () {
        var expectedMarkers, expectedPlaces;
        beforeEach(inject(function ($rootScope) {
            scope.map = {
                center: {
                    latitude: 1,
                    longitude: 2
                },
                markers: [{
                    latitude: 1,
                    longitude: 2
                }, {
                    latitude: 98,
                    longitude: 99
                }]
            };

            expectedPlaces = [{
                geometry: {
                    location: {
                        d: 4,
                        e: 5
                    }
                }
            }];

            expectedMarkers = [{
                latitude: 12,
                longitude: 23
            }];

            spyOn(googlePlaces, 'nearbySearch').and.callThrough();
            spyOn(fakeMarkerSvc, 'createMarkers').and.returnValue(expectedMarkers);
            $rootScope.$broadcast('findAtm');

            googlePlacesDeferred.resolve(expectedPlaces);
            $rootScope.$digest();
        }));

        it('should search for atm', function () {
            expect(googlePlaces.nearbySearch).toHaveBeenCalledWith({
                latitude: 1,
                longitude: 2,
                radius: 1000,
                types: ['atm']
            });
        });

        it('should remove old markers', function () {
            expect(scope.map.markers).not.toContain({
                latitude: 98,
                longitude: 99
            });
        });

        it('should set new markers', function () {
            expect(fakeMarkerSvc.createMarkers).toHaveBeenCalledWith(expectedPlaces);
            expect(scope.map.markers).toContain(expectedMarkers[0]);
        });
    });

    describe('when markerSelected', function () {
        beforeEach(function () {
            spyOn(rootScope, '$broadcast');
            scope.markerSelected();
        });

        it('should broadcast markerSelected', function () {
            expect(rootScope.$broadcast).toHaveBeenCalledWith('markerSelected');
        });
    });
});