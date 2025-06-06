import React, { useEffect } from "react";
import { useState } from "react";
import { Routes, Route, Link, isCookie } from "react-router-dom";
import ContactList from "../components/ContactList/ContactList";
import "../shared/default.css";
import { GlobalContext, ContactProps, ChatMessage } from "../types/contact";
import Baseline from "../components/Baseline/baseline";
import { Contact } from "../components/Contact/Contact";
import Chat from "../components/Chat/chat";
import CreateContact from "../components/CreateContact/CreateContact";
import { useQueryClient } from "@tanstack/react-query";

const initialContacts: ContactProps[] = [
  {
    name: "gemini-1.5-flash",
    lastMessage: "-----",
    profilePicture: "/image/GeminiAI.png",
    messages: [] as ChatMessage[],
    type: 'ai'
  },
  {
    name: "gemini-2.0-flash-lite",
    lastMessage: "-----",
    profilePicture: "/image/GeminiAI.png",
    messages: [] as ChatMessage[],
    type: 'ai'
  }
]


function App() {
  const [contacts, setContacts] = useState<ContactProps[]>(() => {
    // Load contacts from localStorage on initial render
    const savedContacts = localStorage.getItem('contacts');
    console.log(savedContacts);
    return savedContacts ? JSON.parse(savedContacts) : initialContacts;
  });
  const [contact, setContact] = useState<{isOpened: boolean, contact: ContactProps | null}>({isOpened: false, contact: null});
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  function onClose()
  {
    setIsModalOpen(false);
  }

  function onCreateContact(name: string, type: 'ai' | 'person') {
    setIsModalOpen(false);
    const newContact: ContactProps = {
      name: name,
      lastMessage: "-----",
      profilePicture: type === 'ai' ? "/image/GeminiAI.png" : "/image/default-avatar.png",
      messages: [] as ChatMessage[],
      type: type
    };
    setContacts([...contacts, newContact]);
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
           messages={contact.contact.messages}
         />
         <Chat contact={contact.contact} setContacts={setContacts} contacts={contacts}/>
       </div>
        : 
       null}
    </div>
    </GlobalContext.Provider>
  );
}


export default App;
