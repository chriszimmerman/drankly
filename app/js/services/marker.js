var app = angular.module('drankly.services');

app.factory('MarkerSvc', function() {
	return {
		createMarker: function(place) {
			return {
				name: place.name,
				vicinity: place.vicinity,
				latitude: place.geometry.location.d,
				longitude: place.geometry.location.e
			};
		},

		createMarkers: function(places) {
			var markers = [];
			for (var i = 0; i < places.length; i++) {
				markers.push(this.createMarker(places[i]));
			}

			return markers;
		}
	}
});