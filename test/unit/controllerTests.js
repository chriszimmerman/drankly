describe("Controller Tests", function () {
    beforeEach(module("drankly.controllers"));

    describe("SearchCtrl", function () {
        var scope, rootScope;

        beforeEach(inject(function ($rootScope, $controller) {
            rootScope = $rootScope;
            scope = rootScope.$new();
            $controller("SearchCtrl", { $scope: scope, $rootScope: rootScope });
        }));

        describe("when initialized", function () {
            it("should default isActive to false", function () {
                expect(scope.isActive).toBeFalsy();
            });
        });

        describe("when toggleActive", function () {
            describe("and when isActive is false", function () {
                beforeEach(function () {
                    scope.toggleActive();
                });

                it("should set isActive to true", function () {
                    expect(scope.isActive).toBeTruthy();
                });
            });

            describe("and when isActive is true", function () {
                beforeEach(function () {
                    scope.isActive = true;
                    scope.toggleActive();
                });

                it("should set isActive to false", function () {
                    expect(scope.isActive).toBeFalsy();
                });
            });
        });

        describe("when findBars", function () {
            beforeEach(function () {
                spyOn(rootScope, "$broadcast");
                scope.findBars();
            });

            it("should broadcast findBars", function () {
                expect(rootScope.$broadcast).toHaveBeenCalledWith("findBars");
            });
        });

        describe("when reset", function() {
            beforeEach(function() {
                spyOn(rootScope, "$broadcast");
                scope.reset();
            });

            it("should broadcast reset", function() {
                expect(rootScope.$broadcast).toHaveBeenCalledWith("reset");
            });
        });
    });

    describe("MapCtrl", function () {
        var scope, geolocation, googlePlaces,
            geolocationDeferred, googlePlacesDeferred;

        beforeEach(inject(function ($rootScope, $controller, $q) {
            scope = $rootScope.$new();

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

            $controller("MapCtrl", {
                $scope: scope,
                geolocation: geolocation,
                ngGPlacesAPI: googlePlaces
            });
        }));

        describe("when initialized", function () {
            it("should default map", function () {
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

        describe("when setCenter", function () {
            beforeEach(inject(function ($rootScope) {
                spyOn(geolocation, "getLocation").and.callThrough();
                scope.setCenter();

                geolocationDeferred.resolve({ coords: { latitude: 1, longitude: 2 } });
                $rootScope.$digest();
            }));

            it("should set the map center", function () {
                expect(scope.map.center).toEqual({ latitude: 1, longitude: 2 });
            });

            it("should set the map zoom", function () {
                expect(scope.map.zoom).toEqual(15);
            });

            it("should set the markers", function () {
                expect(scope.map.markers).toEqual([{ latitude: 1, longitude: 2 }]);
            });
        });

        describe("when reset", function() {
            beforeEach(inject(function ($rootScope) {
                spyOn(scope, "setCenter");
                $rootScope.$broadcast("reset");
            }));
            
            it("should setCenter", function () {
                expect(scope.setCenter).toHaveBeenCalled();
            });
        });

        describe("when findBars", function () {
            beforeEach(inject(function ($rootScope) {
                scope.map = {
                    center: {
                        latitude: 1,
                        longitude: 2
                    },
                    markers: [
                        { latitude: 1, longitude: 2 },
                        { latitude: 98, longitude: 99 }
                    ]
                };

                spyOn(googlePlaces, "nearbySearch").and.callThrough();
                $rootScope.$broadcast("findBars");

                googlePlacesDeferred.resolve([{
                    geometry: {
                        location: {
                            d: 4,
                            e: 5
                        }
                    }
                }]);
                $rootScope.$digest();
            }));

            it("should search for bars", function () {
                expect(googlePlaces.nearbySearch).toHaveBeenCalledWith({
                    latitude: 1,
                    longitude: 2,
                    radius: 1000,
                    types: ["bar"]
                });
            });

            it("should remove old markers", function () {
                expect(scope.map.markers).not.toContain({
                    latitude: 98,
                    longitude: 99
                });
            });

            it("should set new markers", function () {
                expect(scope.map.markers).toContain({ latitude: 1, longitude: 2 });
                expect(scope.map.markers).toContain({ latitude: 4, longitude: 5 });
            });
        });
    });
});