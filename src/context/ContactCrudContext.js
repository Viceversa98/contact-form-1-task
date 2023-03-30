import { createContext, useState, useContext } from "react";
import api from "../api/contacts";
import { v4 as uuid } from "uuid";
const contactsCrudContext = createContext();

export function ContactsCrudContextProvider({ children }) {
  const [contacts, setContacts] = useState([]);
  const [searchTerm,setSearchTerm] = useState("");
  const [searchResult, setSearchResult] = useState([]);

  //Retrieve contacts
  const retriveContacts = async () => {
    const response = await api.get("/contacts");
    if (response.data) setContacts(response.data);
  };

  //Add contacts

  const addContactHandler = async (contact) => {
    console.log(contact);
    const request = {
      id: uuid(),
      ...contact,
    };

    const response = await api.post("/contacts", request);
    console.log(response);
    setContacts([...contacts, response.data]); // uuid to create unique id for user
  };

  //Delete contact
  const removeContactHandler = async (id) => {
    await api.delete(`/contacts/${id}`);
    const newContactList = contacts.filter((contact) => {
      return contact.id !== id;
    });

    setContacts(newContactList);
  };

  // Update Contact
  const updateContactHandler = async (contact) => {
    const response = await api.put(`contacts/${contact.id}`, contact);
    console.log(response.data);
    const { id } = response.data;

    setContacts(
      contacts.map((contact) => {
        return contact.id === id ? { ...response.data } : contact;
      })
    );
  };

  //Search Function
  
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


  const value = {
    contacts,
    searchTerm,
    searchResult,
    searchHandler,
    retriveContacts,
    removeContactHandler,
    addContactHandler,
    updateContactHandler,
  };

  return (
    <contactsCrudContext.Provider value={value}>
      {children}
    </contactsCrudContext.Provider>
  );
}

export function useContactsCrud() {
  return useContext(contactsCrudContext);
}
