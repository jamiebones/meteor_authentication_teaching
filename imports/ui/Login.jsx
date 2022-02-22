import React, { useState } from "react";
import { Meteor } from "meteor/meteor";
import { useTracker } from "meteor/react-meteor-data";
import CreateAccount from "./CreateAccount.jsx";

export const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginUsername, setLoginUsername] = useState("");
  const [loginpassword, setLoginPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);

  const { user } = useTracker(() => {
    const user = Meteor.user();
    if (user) {
      //get the user role
      const role = Meteor.roleAssignment.find({ "user._id": user._id }).fetch();
      console.log(role);
    }

    return { user };
  }, []);

  const onTextChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const onLoginTextChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "username") {
      setLoginUsername(value);
    } else {
      setLoginPassword(value);
    }
  };

  const registerAccount = () => {
    if (username && password) {
      const userDetails = {
        username,
        password,
      };
      Meteor.call("createAccount", userDetails, (err, res) => {
        if (!err) {
          alert("account creation was succesful");
          setPassword("");
          setUsername("");
        } else {
          alert("account creation failed", err.message);
        }
      });
    }
  };

  const login = () => {
    if (loginUsername && loginpassword) {
      Meteor.loginWithPassword(
        loginUsername,
        loginpassword,
        (error, userId) => {
          if (error) {
            alert(`login failed : ${error.reason}`);
          } else {
            alert(`login succesful`);
            setLoginPassword("");
            setLoginUsername("");
            setLoggedIn(true);
          }
        }
      );
    }
  };

  const logout = () => {
    Meteor.logout();
    setLoggedIn(false);
  };

  return (
    <div className="log-div">
      <div className="create-account">
        <h1>Create Account</h1>
        <p>{loggedIn && `User log into the system`}</p>
        <span>Username</span>
        <input
          type="text"
          name="username"
          onChange={onTextChange}
          value={username}
        />
        <br />
        <br />
        <span>Password</span>
        <input
          type="text"
          name="password"
          onChange={onTextChange}
          value={password}
        />
        <br />
        <br />

        <button type="button" onClick={registerAccount}>
          Register Account
        </button>
      </div>

      <div className="login-account">
        {loggedIn ? (
          <button type="button" onClick={logout}>
            logout
          </button>
        ) : (
          <div>
            <h1>Login</h1>
            <span>Username</span>
            <input
              type="text"
              name="username"
              onChange={onLoginTextChange}
              value={loginUsername}
            />
            <br />
            <br />
            <span>Password</span>
            <input
              type="text"
              name="password"
              onChange={onLoginTextChange}
              value={loginpassword}
            />
            <br />
            <br />

            <button type="button" onClick={login}>
              login
            </button>
          </div>
        )}
      </div>

      {loggedIn && <CreateAccount />}
    </div>
  );
};
