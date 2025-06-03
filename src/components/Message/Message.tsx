import React from 'react';
import styles from './Message.module.css';

interface MessageProps {
  text: string;
  timestamp: string;
  isSent: boolean;
}

export const Message: React.FC<MessageProps> = ({ text, timestamp, isSent }) => {
  return (
    <div className={`${styles.message} ${isSent ? styles.sent : styles.received}`}>
      <div className={styles.content}>
        <p className={styles.text}>{text}</p>
        <span className={styles.timestamp}>{timestamp}</span>
      </div>
    </div>
  );
}; 