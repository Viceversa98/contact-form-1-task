import React from "react";
import ContactCard from "./ContactCard";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
const ContactList = (props) => {
  
 

  const renderContactList = props.contacts.map((contacts) => {
    return (
      <ContactCard contacts={contacts}  key={contacts.id} />
    );
  });

  return (
    <div style={{paddingTop:'100px'}}>
      <h2>
        Contact List
        <Link to={"/add"}> <button className="ui button blue right">Add Contact</button></Link>
       
      </h2>

      <Card.Group>{renderContactList}</Card.Group>
    </div>
  );
};

export default ContactList;
