import React, { useState, useContext } from 'react';
import styles from './chat.module.css';
import { Message } from '../Message/Message';
import { generateContent } from "../../shared/API/model";
import { GlobalContext } from '../../types/contact';

// I love Typescript, why JS even exist in our world and why just couldnt integrate data typing in JS iteslf wtf
interface ChatMessage {
  id: number;
  text: string;
  timestamp: string;
  isSent: boolean;
}

const Chat = () => {
    const { contact } = useContext(GlobalContext);
  const [messages, setMessages] = useState<ChatMessage[]>([

  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSend = async () => {
    if (newMessage.trim()) {
      const message: ChatMessage = {
        id: messages.length + 1,
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: true
      };
      setMessages([...messages, message]);
      setNewMessage('');

      const response = await generateContent({question: newMessage, model: contact.contact.name});
      const aiMessage: ChatMessage = {
        id: messages.length + 2,
        text: response ?? '',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isSent: false
      };
      setMessages(prev => [...prev, aiMessage]);
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
