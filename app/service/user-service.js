(function() {
  'use strict';
  
  // could have made this simulate async db calls

  angular
    .module('userSignUpApp')
    .factory('userService', [function() {
      var users = [{
        username: 'test',
        email: 'test@test.com',
        message: 'test message'
      }, {
        username: 'test2',
        email: 'test2@test.com',
        message: 'test another message'
      }];

      function getUsers() {
        return users;
      }

      function addUser(user) {
        // could have simulated possible fail on server here
        users.push(user);
      }

      return {
        getUsers: getUsers,
        addUser: addUser
      };
    }]);

}());