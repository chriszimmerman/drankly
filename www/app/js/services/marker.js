var app = angular.module('drankly.services');

app.factory('MarkerSvc', function () {
    return {
        createMarker: function (place) {
            return {
                name: place.name,
                latitude: place.geometry.location.lat(),
                longitude: place.geometry.location.lng()
            };
        },

        createMarkers: function (places) {
            var markers = [];
            for (var i = 0; i < places.length; i++) {
                markers.push(this.createMarker(places[i]));
            }

            return markers;
        }
    };
});
