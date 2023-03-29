import React, { useRef , useEffect} from "react";
import ContactCard from "./ContactCard";
import { Card } from "semantic-ui-react";
import { Link } from "react-router-dom";
import { useContactsCrud } from "../context/ContactCrudContext";
const ContactList = (props) => {
  const {contacts,retriveContacts} = useContactsCrud();
  const inputEl = useRef("");
  const renderContactList = contacts.map((contacts) => {
    return <ContactCard contacts={contacts} key={contacts.id} />;
  });

  useEffect(()=> {
    retriveContacts();
  },[]);

  const getSearhTerm = () => {
    props.searchKeyword(inputEl.current.value);
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
            ref={inputEl}
            type="text"
            placeholder="Search Contact"
            className="prompt"
            value={props.term}
            onChange={getSearhTerm}
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
