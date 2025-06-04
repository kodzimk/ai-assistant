import React, { useState, useContext, useEffect } from 'react';
import styles from './chat.module.css';
import { Message } from '../Message/Message';
import { generateContent } from "../../shared/API/model";
import { GlobalContext, ContactProps, ChatMessage } from '../../types/contact';

// I love Typescript, why JS even exist in our world and why just couldnt integrate data typing in JS iteslf wtf
interface ChatProps {
  contact: ContactProps;
  setContacts: React.Dispatch<React.SetStateAction<ContactProps[]>>;
  contacts: ContactProps[];
}

const Chat: React.FC<ChatProps> = ({ contact, setContacts, contacts }) => {
  const [messages, setMessages] = useState<ChatMessage[]>(contact.messages);
  const [newMessage, setNewMessage] = useState('');

 

  useEffect(() => {
    setMessages(contact.messages);
  }, [contact.messages]);

  useEffect(() => {
    localStorage.setItem(`messages_${contact.name}`, JSON.stringify(messages));
 }, [messages]);



  const handleSend = async () => {
    if (newMessage.trim()) {
      // Use local messages state for ID and updates
      const userMessage: ChatMessage = {
        id: messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true
      };
      const updatedMessages = [...messages, userMessage];
      setMessages(updatedMessages);
      setNewMessage('');
  
      // Update parent contacts state with new messages
      setContacts(
        contacts.map(c =>
          c.name === contact.name
            ? { ...c, messages: updatedMessages, lastMessage: newMessage }
            : c
        )
      );
  
      const response = await generateContent({ question: newMessage, model: contact.name });
      const aiMessage: ChatMessage = {
        id: updatedMessages.length + 1,
        text: response ?? '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: false
      };
      const finalMessages = [...updatedMessages, aiMessage];
      setMessages(finalMessages);
  
      setContacts(
        contacts.map(c =>
          c.name === contact.name
            ? { ...c, messages: finalMessages, lastMessage: response ?? '' }
            : c
        )
      );
      setNewMessage('');
    }
  };

  return (
    <div className={styles.chat}>
      <div className={styles.messages}>
        {messages.map((message) => (
          <Message
            key={message.id}
            text={message.text}
            timestamp={message.timestamp}
            isSent={message.isSent}
          />
        ))}
      </div>
      <div className={styles.input}>
        <input
          type="text"
          className={styles.inputField}
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."

          // ahahahh deprecated but it is working so it's not deprecated
          onKeyPress={(e) => e.key === 'Enter' && handleSend()}
        />
        <button className={styles.sendButton} onClick={handleSend}>
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
