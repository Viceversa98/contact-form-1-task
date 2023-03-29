import React from "react";
import { Link } from "react-router-dom";
import user from "../images/user.png";
import { useLocation } from 'react-router-dom';

const ContactDetail = () => {
  const location = useLocation();
  const data = location.state;
  console.log(data);
  const { name, email } = data;
  return (
    <>
      <br></br>
      <br></br>
      <br></br>
      <div className="main">
        <div className="ui card centered">
          <div className="image">
            <img src={user} alt="user"></img>
          </div>
          <div className="header"> {name}</div>
          <div className="description">{email}</div>
        </div>
        <div className="center-div">
          <Link to="/">
            <button className="ui button blue center">
              Back to Contact List
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ContactDetail;
