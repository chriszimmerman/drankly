var app = angular.module('drankly.services');

app.factory('InfoWindowSvc', function() {
	return {
		createInfoWindow: function(place) {
			return {
				coords: {
					latitude: place.geometry.location.d,
					longitude: place.geometry.location.e,
				},
				rating: place.rating
			};
		},
		createInfoWindows: function(places) {
			var infoWindows = [];

			for (var i = 0; i < places.length; i++) {
				infoWindows.push(this.createInfoWindow(places[i]));
			};

			return infoWindows;
		}
	};
});