(function() {
  'use strict';

  // Routes
  angular
    .module('userSignUpApp')
    .config(['$locationProvider', '$routeProvider',
      function config($locationProvider, $routeProvider) {
        $routeProvider
          .when('/signup', {
            template: '<user-signup></user-signup>'
          })
          .when('/users', {
            template: '<users></users>'
          })
          .otherwise('/signup');
          
          // plunker urls not consistent?
          //$locationProvider.html5Mode(true);
      }
    ]);

}());