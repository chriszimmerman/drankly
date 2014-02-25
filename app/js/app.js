var app = angular.module("drankly", [
    "geolocation",
    "google-maps",
    "ngGPlaces",
    "drankly.controllers"
]);

app.config(function(ngGPlacesAPIProvider) {
    ngGPlacesAPIProvider.setDefaults({
        nearbySearchKeys: ["geometry"]
    });
});