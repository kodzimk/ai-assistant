import React, { useState, useContext } from 'react';
import styles from './CreateContact.module.css';
import { GlobalContext } from '../../types/contact';

const AI_MODELS = [
  "gemini-1.5-pro",
  "gemini-1.5-flash",
  "gemini-2.0-pro",
  "gemini-2.0-flash-lite"
];

interface CreateContactProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateContact: (name: string, type: 'ai' | 'person') => void;
}

const CreateContact: React.FC<CreateContactProps> = ({ isOpen, onClose, onCreateContact }) => {
  const [name, setName] = useState('');
  const [contactType, setContactType] = useState<'ai' | 'person'>('person');
  const [selectedModel, setSelectedModel] = useState(AI_MODELS[0]);
  const { isModalOpen, setIsModalOpen } = useContext(GlobalContext);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (contactType === 'ai') {
      onCreateContact(selectedModel, 'ai');
    } else if (name.trim()) {
      onCreateContact(name.trim(), 'person');
    }
    setName('');
    setContactType('person');
    setSelectedModel(AI_MODELS[0]);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.modal} onClick={onClose}>
      <div className={styles.modalContent} onClick={e => e.stopPropagation()}>
        <h2 className={styles.title}>Add new contact</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.typeSelector}>
            <label>
              <input
                type="radio"
                name="contactType"
                value="person"
                checked={contactType === 'person'}
                onChange={() => setContactType('person')}
              />
              Person
            </label>
            <label>
              <input
                type="radio"
                name="contactType"
                value="ai"
                checked={contactType === 'ai'}
                onChange={() => setContactType('ai')}
              />
              AI Assistant
            </label>
          </div>
          
          {contactType === 'ai' ? (
            <select 
              className={styles.select}
              value={selectedModel}
              onChange={(e) => setSelectedModel(e.target.value)}
            >
              {AI_MODELS.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          ) : (
            <input
              type="text"
              className={styles.input}
              placeholder="Enter person's name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              autoFocus
            />
          )}

          <div className={styles.buttonGroup}>
            <button type="button" className={`${styles.button} ${styles.cancelButton}`} onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className={`${styles.button} ${styles.createButton}`}>
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateContact; 