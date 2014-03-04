describe('MarkerSvc', function() {
	var svc;

	beforeEach(module('drankly.services'));
	beforeEach(function() {
		inject(function($injector) {
			svc = $injector.get('MarkerSvc');
		});
	})

	describe('when createMarker', function() {
		var result;

		beforeEach(function() {
			var place = {
				geometry: {
					location: {
						d: 2,
						e: 1
					}
				}
			};

			result = svc.createMarker(place);
		})

		it('should set longitude', function() {
			expect(result.longitude).toEqual(1);
		})

		it('should set latitude', function() {
			expect(result.latitude).toEqual(2);
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