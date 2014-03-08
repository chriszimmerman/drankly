describe('services/marker', function() {
	var svc;

	beforeEach(module('drankly.services'));
	beforeEach(function() {
		inject(function($injector) {
			svc = $injector.get('MarkerSvc');
		});
	})

	describe('when createMarker', function() {
		var result, place;

		beforeEach(function() {
			place = {
				name: 'name',
				vicinity: 'address',
				geometry: {
					location: {
						d: 2,
						e: 1
					}
				}
			};

			result = svc.createMarker(place);
		})

		it('should set latitude', function() {
			expect(result.latitude).toEqual(place.geometry.location.d);
		})

		it('should set longitude', function() {
			expect(result.longitude).toEqual(place.geometry.location.e);
		})

		it('should set name', function() {
			expect(result.name).toEqual(place.name);
		})

		it('should set vicinity', function() {
			expect(result.vicinity).toEqual(place.vicinity);
		})
	})

	describe('when createMarkers', function() {
		var places = [{
			a: {}
		}, {
			b: {}
		}];
		beforeEach(function() {
			spyOn(svc, 'createMarker');
			svc.createMarkers(places);
		})

		it('should create each marker', function() {
			expect(svc.createMarker).toHaveBeenCalledWith(places[0]);
			expect(svc.createMarker).toHaveBeenCalledWith(places[1]);
		})
	})
})