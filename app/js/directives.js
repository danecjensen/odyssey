'use strict';

/* Directives */


angular.module('odyssey.directives', []).
  directive('appVersion', ['version', function(version) {
    return function(scope, elm, attrs) {
      elm.text(version);
    };
  }]).
  directive('googleplace', ['currentCity', '$location', function(currentCity, $location) {
    return {
        link: function(scope, element, attrs) {
                    var options = {
                        types: ['(cities)'],
                        componentRestrictions: {country: 'us'}
                    };
                    scope.gPlace = new google.maps.places.Autocomplete(element[0], options);
                    google.maps.event.addListener(scope.gPlace, 'place_changed', function() {
		                var place = scope.gPlace.getPlace();
		                var current_city = {
		                	name: place.name,
		                	formatted_address: place.formatted_address,
		                	location: {
		                		lat: place.geometry.location.jb,
		                		lng: place.geometry.location.kb
		                	}
		                }
		                currentCity.setProperty(current_city);
		                scope.$apply(function() {
		                    $location.path('/b');                
		                });
		            });
                }

    }
}]);
