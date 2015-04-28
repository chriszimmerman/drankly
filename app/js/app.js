angular.module('drankly.services', []);
angular.module('drankly.controllers', ['drankly.services']);

var app = angular.module('drankly', [
    'ngRoute',
    'googleplus',
    'geolocation',
    'google-maps',
    'ngGPlaces',
    'drankly.controllers',
    'drankly.services'
]);

app.config(function ($routeProvider, GooglePlusProvider, ngGPlacesAPIProvider) {
    GooglePlusProvider.init({
        clientId: '528011517824-nouds1g4onh0d9tv6c1ghh3n5elqhf1j'
    });

    $routeProvider.when("/", {
        templateUrl: 'app/partials/app.html'
    }).when("/login", {
        templateUrl: 'app/partials/login.html',
        controller: 'LoginCtrl'
    });

    ngGPlacesAPIProvider.setDefaults({
        nearbySearchKeys: ['name', 'geometry', 'reference']
    });
}).run(function ($rootScope, $location) {
    $rootScope.$on("$routeChangeStart", function (event, next, current) {
        if ($rootScope.user == null)
            if (next.templateUrl != "partials/login.html")
                $location.path("/login");
    });
});
