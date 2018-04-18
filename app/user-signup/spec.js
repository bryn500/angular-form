(function() {
  'use strict';

  describe('User Signup', function() {

    beforeEach(module('userSignup'));

    describe('UserSignUp Controller', function() {
      var ctrl, location, userService;

      var user = {
        username: 'test'
      };

      beforeEach(inject(function($componentController, _$location_, _userService_) {
        location = _$location_;
        userService = _userService_;

        spyOn(userService, "addUser");
        spyOn(location, 'path');

        ctrl = $componentController('userSignup');
      }));

      describe('addUser', function() {
        it('should call userService.addUser and redirect to /users if valid', function() {
          // arrange
          ctrl.signupForm = {
            $valid: true
          };

          // act
          ctrl.addUser(user);

          // assert
          expect(userService.addUser).toHaveBeenCalledWith(user);
          expect(location.path).toHaveBeenCalledWith('/users');
        });

        it('should not call userService.addUser or redirect if invalid', function() {
          // arrange
          ctrl.signupForm = {
            $valid: false
          };

          // act
          ctrl.addUser(user);

          // assert
          expect(userService.addUser).not.toHaveBeenCalled();
          expect(location.path).not.toHaveBeenCalled();
        });

      });
    });

    describe('Username Validation', function() {
      var $scope, $timeout, form, userService;

      var users = [{
        username: 'test'
      }];

      beforeEach(inject(function($compile, $rootScope, _$timeout_, _userService_) {
        $scope = $rootScope;
        $timeout = _$timeout_;
        userService = _userService_;

        spyOn(userService, "getUsers").and.returnValue(users);

        // arrange
        // create form and input with validation attribute
        var element = angular.element(
          '<form name="form">' +
          '<input ng-model="model.username" name="username" username-validation />' +
          '</form>'
        );
        $scope.model = {
          username: null
        }
        $compile(element)($scope);
        form = $scope.form;
      }));

      it('should pass with new username', function() {
        // act
        form.username.$setViewValue('test2');
        // force timeout to complete
        $timeout.flush();

        // assert
        expect($scope.model.username).toEqual('test2');
        expect(form.username.$valid).toBe(true);
        expect(userService.getUsers).toHaveBeenCalled();
      });

      it('should not pass with existing username', function() {
        // act
        form.username.$setViewValue('test');
        // force timeout to complete
        $timeout.flush();

        // assert
        expect(form.username.$valid).toBe(false);
        expect(userService.getUsers).toHaveBeenCalled();
      });
    });
  });
}());