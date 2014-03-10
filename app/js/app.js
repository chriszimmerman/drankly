angular.module('drankly.services', []);
angular.module('drankly.controllers', ['drankly.services']);

var app = angular.module('drankly', [
	'geolocation',
	'google-maps',
	'ngGPlaces',
	'drankly.controllers',
	'drankly.services'
]);

app.config(function(ngGPlacesAPIProvider) {
	ngGPlacesAPIProvider.setDefaults({
		nearbySearchKeys: ['geometry', 'reference']
	});
});