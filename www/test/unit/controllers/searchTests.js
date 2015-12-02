describe('controllers/search', function() {
	var scope, rootScope;

	beforeEach(module('drankly.controllers'));
	beforeEach(inject(function($rootScope, $controller) {
		rootScope = $rootScope;
		scope = rootScope.$new();
		$controller('SearchCtrl', {
			$scope: scope,
			$rootScope: rootScope
		});
	}));

	describe('when findBars', function() {
		beforeEach(function() {
			spyOn(rootScope, '$broadcast');
			scope.findBars();
		});

		it('should broadcast findBars', function() {
			expect(rootScope.$broadcast).toHaveBeenCalledWith('findBars');
		});
	});

	describe('when findAtm', function() {
		beforeEach(function() {
			spyOn(rootScope, '$broadcast');
			scope.findAtm();
		});

		it('should broadcast findAtm', function() {
			expect(rootScope.$broadcast).toHaveBeenCalledWith('findAtm');
		});
	});

	describe('when reset', function() {
		beforeEach(function() {
			spyOn(rootScope, '$broadcast');
			scope.reset();
		});

		it('should broadcast reset', function() {
			expect(rootScope.$broadcast).toHaveBeenCalledWith('reset');
		});
	});
});