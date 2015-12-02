describe('services/marker', function () {
    var svc;

    beforeEach(module('drankly.services'));
    beforeEach(function () {
        inject(function ($injector) {
            svc = $injector.get('MarkerSvc');
        });
    });

    describe('when createMarker', function () {
        var result, place;

        beforeEach(function () {
            place = {
                name: 'name',
                vicinity: 'address',
                geometry: {
                    location: {
                        k: 2,
                        B: 1
                    }
                }
            };

            result = svc.createMarker(place);
        });

        it('should set latitude', function () {
            expect(result.latitude).toEqual(place.geometry.location.k);
        });

        it('should set longitude', function () {
            expect(result.longitude).toEqual(place.geometry.location.B);
        });

        it('should set the name', function () {
            expect(result.name).toEqual(place.name);
        });
    });

    describe('when createMarkers', function () {
        var places = [{
            a: {}
        }, {
            b: {}
        }];

        beforeEach(function () {
            spyOn(svc, 'createMarker');
            svc.createMarkers(places);
        });

        it('should create each marker', function () {
            expect(svc.createMarker).toHaveBeenCalledWith(places[0]);
            expect(svc.createMarker).toHaveBeenCalledWith(places[1]);
        });
    });
})