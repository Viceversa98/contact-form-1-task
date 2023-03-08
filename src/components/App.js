import "./App.css";
import Header from "./Header";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";

function App() {
  const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContact] = useState([]);

  const AddContactHandler = (contact) => {
    console.log(contact);
    setContact([...contacts, { id: uuid(), ...contact }]); // uuid to create unique id for user
  };

  const removeContactHandler = (id) => {
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContact(newContactList);
  };

  useEffect(() => {
    const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    if (retriveContacts) {
      setContact(retriveContacts);
    }
  }, []);

  useEffect(() => {
    if (contacts.length)
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <div className="ui container">
        <Router>
          <Header />
          <Switch>
            <Route
              path="/"
              exact
              render={(props) => <ContactList {...props} contacts={contacts} />}
            />
            <Route
              path="/add"
              render={(props) => (
                <AddContact {...props} AddContactHandler={AddContactHandler} />
              )}
            />
            <Route path="/contact/:id" component={ContactDetail} />
            <Route
              path="/delete/:id"
              render={(props) => (
                <DeleteContact {...props} removeContactHandler={removeContactHandler} /> // call the deletecontact component
              )}
              
            />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
