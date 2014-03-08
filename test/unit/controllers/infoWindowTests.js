describe('controllers/infoWindow', function() {
	var scope, rootScope;

	beforeEach(module('drankly.controllers'));

	beforeEach(inject(function($rootScope, $controller) {
		rootScope = $rootScope;
		scope = rootScope.$new();

		$controller('InfoWindowCtrl', {
			$rootScope: rootScope,
			$scope: scope,
		});
	}));

	describe('when initialized', function () {
		it('should default showInfoWindow', function () {
			expect(scope.showInfoWindow).toBeFalsy();
		})
	})

	describe('when markerSelected', function() {
		describe('and when showInfoWindow is false', function() {
			beforeEach(function() {
				scope.showInfoWindow = false;
				rootScope.$broadcast('markerSelected');
			});

			it('should set showInfoWindow to true', function() {
				expect(scope.showInfoWindow).toBeTruthy();
			})
		});

		describe('and when showInfoWindow is true', function() {
			beforeEach(function() {
				scope.showInfoWindow = true;
				rootScope.$broadcast('markerSelected');
			});

			it('should set showInfoWindow to false', function() {
				expect(scope.showInfoWindow).toBeFalsy();
			})
		});
	})
});