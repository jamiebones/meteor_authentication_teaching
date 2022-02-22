import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

Meteor.methods({
  createAccount: function (user) {
    const { username, password } = user;
    if (!Accounts.findUserByUsername(username)) {
      Accounts.createUser({
        username: username,
        password: password,
      });
    }
    return;
  },
  createNewUserAccount: function (option) {
    const { username, password } = option;
    const loggedInUser = Meteor.user();

    if (Roles.userIsInRole(loggedInUser, ["admin", "manage-users"])) {
      if (!Accounts.findUserByUsername(username)) {
        Accounts.createUser({
          username: username,
          password: password,
        });
      }
    } else {
      throw new Meteor.Error("You are not authorized to create new user");
    }
  },
});
