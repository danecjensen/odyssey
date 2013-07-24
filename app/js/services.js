'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('odyssey.services', ['ngResource'],
    function ($provide) {
        $provide.factory('foursquareResource', function ($http, $resource, $log) {
        	delete $http.defaults.headers.common["X-Requested-With"];
            return $resource('https://api.foursquare.com/v2/venues/:venueId/:aspect',
                {
                    'venueId': '4fc77712e4b081ac0cd040e6',
                    'aspect': 'photos',
                    'client_id' : 'AAUXORIZZ1CNKYBDNXUINODGQT24W2XO3IQAFIZ04Y0YBWVQ',
                    'client_secret' : 'L0KWGXINDGXNCHLBPQKDBVY4QPARCWZLTSKJPBMV11ICADCX',
                    'v' : '20130715'
                },{
			        get: {
			            method: 'GET',
			            transformResponse: [function (data, headersGetter) {
			                // you can examine the raw response in here
			                $log.info(data);
			                $log.info(headersGetter());
			                return {tada:"Check your console"};
			            }].concat($http.defaults.transformResponse),
			            isArray: false
			        }
			    });
        });
    }).value('version', '0.1');
