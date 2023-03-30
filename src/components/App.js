import "./App.css";
import Header from "./Header";

import React, { useState, useEffect } from "react";
import AddContact from "./AddContact";
import ContactList from "./ContactList";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ContactDetail from "./ContactDetail";
import DeleteContact from "./DeleteContact";
import EditContact from "./EditContact";
import { ContactsCrudContextProvider } from "../context/ContactCrudContext";
import api from "../api/contacts";

function App() {
  // const LOCAL_STORAGE_KEY = "contacts";
  const [contacts, setContact] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

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
    } else {
      setSearchResult(contacts);
    }
  };

  useEffect(() => {
    // if (contacts.length)
    //  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(contacts));
  }, [contacts]);

  return (
    <>
      <div className="ui container">
        <Router>
          <Header />
          <ContactsCrudContextProvider>
            <Routes>
              <Route
                path="/"
                exact
                element={<ContactList />}
                // render={(props) => (
                //   <ContactList
                //     {...props}
                //     contacts={searchTerm.length < 1 ? contacts : searchResult}
                //     term={searchTerm}
                //     searchKeyword={searchHandler}
                //   />
                // )}
              />
              <Route
                path="/add"
                element={<AddContact />}
                //   <AddContact {...props} AddContactHandler={AddContactHandler} />
                // )}
              />
              <Route path="/contact/:id" element={<ContactDetail />} />
              <Route
                path="/delete/:id"
                element={<DeleteContact />}
                // render={(props) => (
                //   <DeleteContact
                //     {...props}
                //     removeContactHandler={removeContactHandler}
                //   /> // call the deletecontact component
                // )}
              />
              <Route
                path="/edit/:id"
                element={<EditContact />}
                // render={(props) => (
                //   <EditContact
                //     {...props}
                //     updateContactHandler={updateContactHandler}
                //   /> // call the deletecontact component
                // )}
              />
            </Routes>
          </ContactsCrudContextProvider>
        </Router>
      </div>
    </>
  );
}

export default App;
