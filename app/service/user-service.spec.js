(function() {
  "use strict";

describe("User Service", function() {
  var userService;

  var testUser = {
    username: 'test'
  };

  beforeEach(module("userSignUpApp"));

  beforeEach(inject(function(_userService_) {
    userService = _userService_;
  }));

  describe("addUser", function() {
    it("should add to array", function() {
      // arrange
      var users = userService.getUsers();
      var initialLength = users.length;

      // act
      userService.addUser(testUser);
      users = userService.getUsers();

      // assert
      expect(users.length).toBe(initialLength + 1);
    });
  });
});
}());