(function() {
  'use strict';

  angular.module('users', ['userSignUpApp']);

  angular
    .module('users')
    .component('users', {
      templateUrl: 'app/users/template.html',
      controller: ['userService', function UserController(userService) {
        var self = this;
        
        self.users = userService.getUsers();
      }]
    });

}());