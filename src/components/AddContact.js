import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContactsCrud } from "../context/ContactCrudContext";

const AddContact = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const {addContactHandler} =useContactsCrud();
  const navigate = useNavigate();

  const add = (e) => {
    e.preventDefault();
    if (name === "" || email === "") {
      alert("all the field is mandatory");
      return;
    }

    addContactHandler({name,email});
    setName("");
    setEmail("");
    navigate("/");
   
  };

  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className="ui main">
        <h1>Add Contact</h1>

        <form className="ui form" onSubmit={add}>
          <div className="field">
            <label>Name</label>
            <input
              type="text"
              name="name" 
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>

          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button className="ui button blue">Add</button>
        </form>
      </div>
    </>
  );
};

export default AddContact;
