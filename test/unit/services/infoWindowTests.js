describe('services/infoWindow', function() {
	var service;

	beforeEach(module('drankly.services'));
	beforeEach(function() {
		inject(function($injector) {
			svc = $injector.get('InfoWindowSvc');
		});
	})

	describe('when createInfoWindow', function() {
		var result;

		beforeEach(function() {
			var place = {
				geometry: {
					location: {
						d: 2,
						e: 3
					}
				},
				rating: 1
			}
			result = svc.createInfoWindow(place);
		})

		it('should set latitude', function() {
			expect(result.coords.latitude).toEqual(2);
		})


		it('should set longitude', function() {
			expect(result.coords.longitude).toEqual(3);
		})


		it('should set rating', function() {
			expect(result.rating).toEqual(1);
		})
	})
})