import React, { useState } from "react";

const CreateAccount = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const onTextChange = (e) => {
    const value = e.target.value;
    const name = e.target.name;
    if (name === "username") {
      setUsername(value);
    } else {
      setPassword(value);
    }
  };

  const createNewUserAccount = () => {
    if (username && password) {
      const userDetails = {
        username,
        password,
      };
      Meteor.call("createNewUserAccount", userDetails, (err, res) => {
        if (!err) {
          alert("user account created");
          setPassword("");
          setUsername("");
        } else {
          alert(`account creation failed : ${err.message}`);
        }
      });
    }
  };

  return (
    <div className="main-panel">
      <h2>Create New User Account</h2>
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

      <button type="button" onClick={createNewUserAccount}>
        Register Account
      </button>
    </div>
  );
};

export default CreateAccount;
