'use strict';

/* Controllers */

angular.module('odyssey.controllers', []).
  controller('SearchCtrl', function($scope, $http, foursquareResource, currentCity) {
  	delete $http.defaults.headers.common["X-Requested-With"];
  	$scope.destinations = [];
  	$scope.current_city = currentCity.getProperty();
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
        'll' : $scope.current_city.location.lat + ',' + $scope.current_city.location.lng, 
        'limit' : 10,
        'v' : '20130715',
        //'style_results': true 
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
          $scope.suggestions = data.response.minivenues;

          // var minivenues = data.response.minivenues;

          // for (var i = 0; i < minivenues.length; i++) {
          //   var v = minivenues[i] 
          //   var s = {data: v, label: v.name + " " + v.location.address + " " + v.location.city + ", " + v.location.state}
          //   $scope.suggestions.push(s);
          // }
          console.log($scope.suggestions);
        }).
        error(function(data, status, headers, config) {});

      return $scope.suggestions;
    }

    $scope.onSelect = function($item, $model, $label){
      var d = angular.extend({'name': $model.name, 'photo_url': ''}, $model.location);
      $scope.destinations.unshift(d);
      var photo = foursquareResource.get({'venueId': $model.id}, function(){
    	var photo_url = photo.response.photos.items[0].prefix + "300x200" + photo.response.photos.items[0].suffix;
    	$scope.destinations[0].photo_url = photo_url;
      });
      
      //$scope.markers.push({latitude: $model.data.location.lat, longitude: $model.data.location.lng});
    }
  })
  .controller('HomeCtrl', function($scope, $http) {
  	  $scope.gPlace;
	  $scope.current_city;
  });