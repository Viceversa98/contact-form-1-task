import "./App.css";
import Header from "./Header";
import { v4 as uuid } from "uuid";
import React, { useState, useEffect } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import api from "../api/contacts";
import EditContact from "./EditContact";
function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  //Retrieve contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    return response.data;
  };

  const AddContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);

    setContact([...contacts, response.data]); // uuid to create unique id for user
  };

  const updateContactHandler = async (contact) => {
    const response = await api.put(`contacts/${contact.id}`, contact);
    console.log(response.data);
    const { id, name, email } = response.data;

    setContact(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  async function removeContactHandler(id) {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContact(newContactList);
  }

  const searchHandler = (searchTerm) => {
    setSearchTerm(searchTerm);
    if (searchTerm !== "") {
      const newContactList = contacts.filter((contacts) => {
        return Object.values(contacts)
          .join(" ")
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
      });
      setSearchResult(newContactList);
    }
    else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    // const retriveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
    // if (retriveContacts) {
    //   setContact(retriveContacts);
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if (allContacts) setContact(allContacts);
    };

    getAllContacts();
  }, []);

  useEffect(() => {
    // if (contacts.length)
    //  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
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
              render={(props) => (
                <ContactList
                  {...props}
                  contacts={searchTerm.length < 1 ? contacts : searchResult}
                  term={searchTerm}
                  searchKeyword={searchHandler}
                />
              )}
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
                <DeleteContact
                  {...props}
                  removeContactHandler={removeContactHandler}
                /> // call the deletecontact component
              )}
            />
            <Route
              path="/edit"
              render={(props) => (
                <EditContact
                  {...props}
                  updateContactHandler={updateContactHandler}
                /> // call the deletecontact component
              )}
            />
          </Switch>
        </Router>
      </div>
    </>
  );
}

export default App;
