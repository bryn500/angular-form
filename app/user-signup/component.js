(function() {
  'use strict';

  angular.module('userSignup', ['userSignUpApp']);

  angular.module('userSignup')
    .component('userSignup', {
      templateUrl: 'app/user-signup/template.html',
      controller: ['$location', 'userService', function UserSignUpController($location, userService) {
        var self = this;

        // if form is valid add user to list
        self.addUser = function(user) {
          if (self.signupForm.$valid) {
            userService.addUser(user);
            $location.path("/users");
          }
        };
      }]
    })

  .directive('usernameValidation', ['userService', '$q', '$timeout', function(userService, $q, $timeout) {
    return {
      require: 'ngModel',
      link: function(scope, elm, attrs, ctrl) {

        ctrl.$asyncValidators.username = function(modelValue, viewValue) {
          var def = $q.defer();

          // simulate async call
          $timeout(function() {
            var users = userService.getUsers();

            // don't validate if no current users or model is empty
            if (!users.length || !modelValue) {
              def.resolve();
            }

            // n.b. es6 arrow function - not cross browser compatible https://caniuse.com/#feat=arrow-functions
            // n.b. es5 array.map - not cross browser compatible https://caniuse.com/#feat=es5
            var usernames = users.map((x) => {
              return x.username.toUpperCase();
            });

            // case insensitive username comparison
            if (usernames.indexOf(modelValue.toUpperCase()) === -1) {
              // The username is available
              def.resolve();
            } else {
              // The username is not available
              def.reject();
            }

          }, 1000);

          return def.promise;

        };
      }
    };
  }]);

}());