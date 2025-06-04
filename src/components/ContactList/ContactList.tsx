import React, { useState } from 'react';
import { ContactListProps } from '../../types/contact';
import { Contact } from '../Contact/Contact';
import styles from './ContactList.module.css';
import { GlobalContext } from '../../types/contact';
import { useContext } from 'react';

export default function ContactList({ contacts }: ContactListProps) {
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);

  function handlePlusClick() {
    setIsModalOpen(true);
    console.log(isModalOpen);
  }

  return (
    <div className={styles.contactList}>
      <header className={styles.header}>
        <h1>Contacts</h1>
        <img src="../public/image/Plus.png" alt="logo" className={styles.plus} onClick={handlePlusClick}/>
      </header>
      <div className={styles.list}>
        {contacts.map((contact) => (
          <Contact
            key={contact.name}
            name={contact.name}
            lastMessage={contact.lastMessage}
            profilePicture={contact.profilePicture}
            messages={contact.messages}
          />
        ))}
      </div>
    </div>
  );
}; 