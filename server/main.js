import "../imports/startup/server";
import { Meteor } from "meteor/meteor";
import { Accounts } from "meteor/accounts-base";
import { Roles } from "meteor/alanning:roles";

Meteor.startup(() => {
  // code to run on server at startup
  const users = [
    {
      name: "Normal User",
      username: "jamieOne",
      password: "password",
      roles: ["normal-user"],
    },
    {
      name: "Admin User",
      username: "jamieTwo",
      password: "password",
      roles: ["admin"],
    },
  ];

  users.forEach((user) => {
    //check if the user exists
    let id;
    if (!Accounts.findUserByUsername(user.username)) {
      id = Accounts.createUser({
        username: user.username,
        password: user.password,
      });
      if (Meteor.roleAssignment.find({ "user._id": id }).count() === 0) {
        user.roles.forEach(function (role) {
          Roles.createRole(role, { unlessExists: true });
        });
        Roles.addUsersToRoles(id, user.roles);
      }
    }
  });
});
