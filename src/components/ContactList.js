import React, { useRef , useEffect} from "react";
import ContactCard from "./ContactCard";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactCrudContext";
const ContactList = (props) => {
  const {contacts,retriveContacts,searchTerm,searchResult,searchHandler} = useContactsCrud();
 
  const renderContactList = (searchTerm.length < 1 ? contacts: searchResult).map((contacts) => {
    return <ContactCard contacts={contacts} key={contacts.id} />;
  });

  useEffect(()=> {
    retriveContacts();
  },[]);

  const onUserSearch = (e) => {
   searchHandler(e.target.value);
  };

  return (
    <div style={{ paddingTop: "100px" }}>
      <h2>
        Contact List
        <Link to={"/add"}>
          {" "}
          <button className="ui button blue right">Add Contact</button>
        </Link>
      </h2>
      <div className="ui search">
        <div className="ui icon input">
          <input
            
            type="text"
            placeholder="Search Contact"
            className="prompt"
            value={searchTerm}
            onChange={(e) => onUserSearch(e)}
          />
          <i className="search icon"></i>
        </div>
      </div>
      <br></br>
      <Card.Group>
        {renderContactList.length > 0
          ? renderContactList
          : "No contact available"}
      </Card.Group>
    </div>
  );
};

export default ContactList;
