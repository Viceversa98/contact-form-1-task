import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useContactsCrud } from "../context/ContactCrudContext";

const EditContact = () => {
  const location = useLocation();
  const { id, name, email } = location.state.contacts;
  const [newName, setNewName] = useState(name);
  const [newEmail, setNewEmail] = useState(email);
  const { updateContactHandler } = useContactsCrud();
  const navigate = useNavigate();
  const update = (e) => {
    e.preventDefault();
    if (newName === "" || newEmail === "") {
      alert("all the field is mandatory");
      return;
    }

    updateContactHandler({ id, name: newName, email: newEmail });
    setNewName("");
    setNewEmail("");

    navigate("/");
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className="ui main">
        <h1>Edit Contact</h1>

        <form className="ui form" onSubmit={update}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name"
              placeholder="Name"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={newEmail}
              onChange={(e) => setNewEmail(e.target.value)}
            />
          </div>
          <button className="ui button blue">Update</button>
        </form>
      </div>
    </>
  );
};

export default EditContact;
