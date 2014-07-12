var app = angular.module('drankly.services');

app.factory('MarkerSvc', function() {
	return {
		createMarker: function(place) {
			return {
				reference: place.reference,
				latitude: place.geometry.location.k,
				longitude: place.geometry.location.B
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