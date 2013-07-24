'use strict';

/* Controllers */

angular.module('odyssey.controllers', []).
  controller('SearchCtrl', function($scope, $http, foursquareResource) {
  	delete $http.defaults.headers.common["X-Requested-With"];
  	$scope.destinations = [];
  // 	$scope.getSuggestions = function(){
  // 		var opts = {
  // 			'query': $scope.placeQuery,
	 //  		'll' : '40.7,-74.0', 
	 //        'limit' : 10,
	 //    };
	 //    console.log(foursquareResource.get(opts));
	 //    $scope.suggestions = foursquareResource.get(opts);
		// return $scope.suggestions
  // 	}

    $scope.getSuggestions = function(){

      var opts = {
        'url' : 'https://api.foursquare.com/v2/venues/suggestCompletion?',
        'client_id'     : 'AAUXORIZZ1CNKYBDNXUINODGQT24W2XO3IQAFIZ04Y0YBWVQ',
        'client_secret' : 'L0KWGXINDGXNCHLBPQKDBVY4QPARCWZLTSKJPBMV11ICADCX',
        'll' : '40.7,-74.0', 
        'limit' : 10,
        'v' : '20130715',
        'style_results': true 
      }

      var url = opts.url 
        + "query=" + $scope.placeQuery
        + "&ll=" + opts.ll 
        + "&v=" + opts.v 
        + "&limit=" + opts.limit
        + "&client_id=" + opts.client_id
        + "&client_secret=" + opts.client_secret;

      $http({method: 'GET', url: url}).
        success(function(data, status, headers, config) {
          $scope.suggestions = [];
          var minivenues = data.response.minivenues;
          for (var i = 0; i < minivenues.length; i++) {
            var v = minivenues[i] 
            var s = {data: v, label: v.name + " " + v.location.address + " " + v.location.city + ", " + v.location.state}
            $scope.suggestions.push(s);
          }
        }).
        error(function(data, status, headers, config) {});

      return $scope.suggestions;
    }

    $scope.onSelect = function($item, $model, $label){
      var d = angular.extend({'name': $model.data.name, 'photo_url': ''}, $model.data.location);
      $scope.destinations.unshift(d);
      var photo = foursquareResource.get({'venueId': $model.data.id}, function(){
    	var photo_url = photo.response.photos.items[0].prefix + "200x200" + photo.response.photos.items[0].suffix;
    	$scope.destinations[0].photo_url = photo_url;
      });
      
      //$scope.markers.push({latitude: $model.data.location.lat, longitude: $model.data.location.lng});
    }
  })
  .controller('HomeCtrl', function($scope, $http) {
	  $scope.cities = function(cityName) {
	  	var url = "http://api.geonames.org/searchJSON?maxRows=10&username=danejensen&continentCode=NA&name=" + cityName;
	  	$http({method: 'GET', url: url}).
	    success(function(data, status, headers, config) {
	    	return data
	    }).
	    error(function(data, status, headers, config) {});
	  };
  });