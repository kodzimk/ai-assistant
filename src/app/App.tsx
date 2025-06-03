import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, Link, isCookie } from "react-router-dom";
import ContactList from "../components/ContactList/ContactList";
import "../shared/default.css";
import { GlobalContext } from "../types/contact";
import Baseline from "../components/Baseline/baseline";
import { Contact } from "../components/Contact/Contact";
import Chat from "../components/Chat/chat";
import CreateContact from "../components/CreateContact/CreateContact";

const initialContacts = [
  {
    name: "gemini-1.5-flash",
    lastMessage: "-----",
    profilePicture: "../public/image/GeminiAI.png"
  },
  {
    name: "gemini-2.0-flash-lite",
    lastMessage: "-----",
     profilePicture: "../public/image/GeminiAI.png"
  }
]


function App() {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [contact, setContact] = useState({isOpened: false, contact: null});
  const [isModalOpen, setIsModalOpen] = useState(false);

  function onClose()
  {
    setIsModalOpen(false);
    
    console.log('sada');
  }

  function onCreateContact(name)
  {
    setIsModalOpen(false);
    setContacts([...contacts,{name: name, lastMessage: "-----", profilePicture: "../public/image/GeminiAI.png"}]);
  }

  return (
    <GlobalContext.Provider value={{contact, setContact, isModalOpen, setIsModalOpen}}>
    <div className="body">
     <ContactList contacts={contacts} />
     <CreateContact isOpen={isModalOpen} onClose={onClose} onCreateContact={onCreateContact} />
  

     {contact.contact ? 
       <div className="chat-container">
         <Baseline
           key={contact.contact.name}
           name={contact.contact.name}
           lastMessage={contact.contact.lastMessage}
           profilePicture={contact.contact.profilePicture}
         />
         <Chat/>
       </div>
        : 
       null}
    </div>
    </GlobalContext.Provider>
  );
}

export default App;
