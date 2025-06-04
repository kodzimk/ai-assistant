import React, { useContext } from 'react';
import { ContactProps, GlobalContext } from '../../types/contact';
import styles from './baseline.module.css';

 const Baseline: React.FC<ContactProps> = ({ name, lastMessage, profilePicture, messages }) => {

  return (
    <div className={styles.contact}>
      <img 
        src={profilePicture} 
        alt={`${name}'s profile`} 
        className={styles.profilePicture}
      />
      <div className={styles.contactInfo}>
        <h3 className={styles.name}>{name}</h3>
      </div>
    </div>
  );
}; 

export default Baseline;