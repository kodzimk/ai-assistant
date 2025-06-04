import React, { useContext } from 'react';
import { ContactProps, GlobalContext } from '../../types/contact';
import styles from './Contact.module.css';

export const Contact: React.FC<ContactProps> = ({ name, lastMessage, profilePicture, messages }) => {
  const { contact, setContact } = useContext(GlobalContext);

  const handleClick = () => {
    setContact({isOpened: true, contact: {name, lastMessage, profilePicture, messages}});
  }

  return (
    <div className={styles.contact}  onClick = {handleClick}>
     
      <img 
        src={profilePicture} 
        alt={`${name}'s profile`} 
        className={styles.profilePicture}
      />
      <div className={styles.contactInfo}>
        <h3 className={styles.name}>{name}</h3>
        <p className={styles.lastMessage}>{lastMessage}</p>
      </div>
    </div>
  );
}; 