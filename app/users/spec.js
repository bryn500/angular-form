(function() {
  'use strict';

  describe('Users', function() {

    // Load the module that contains the `userSignup` component before each test
    beforeEach(module('users'));

    // Test the controller
    describe('User Controller', function() {
      var ctrl, userService;

      var testResult = ['test'];

      beforeEach(inject(function($componentController, _userService_) {
        userService = _userService_;
        
        spyOn(userService, "getUsers").and.returnValue(testResult);

        ctrl = $componentController('users');
      }));

      it('should set users property to the result of userService.getUsers', function() {
        // assert
        expect(userService.getUsers).toHaveBeenCalled();
        expect(ctrl.users).toBe(testResult);
      });
    });
  });
}());