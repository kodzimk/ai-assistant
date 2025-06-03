import React, { useState, useContext } from 'react';
import styles from './CreateContact.module.css';
import { GlobalContext } from '../../types/contact';

interface CreateContactProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateContact: (name: string) => void;
}

const CreateContact: React.FC<CreateContactProps> = ({ isOpen, onClose, onCreateContact }) => {
  const [name, setName] = useState('');
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onCreateContact(name.trim());
      setName('');
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Add new friend</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <input
            type="text"
            className={styles.input}
            placeholder="Enter character name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoFocus
          />
          <div className={styles.buttonGroup}>
            <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={`${styles.button} ${styles.createButton}`} onClick={handleSubmit}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContact; 