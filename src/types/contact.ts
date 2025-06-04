import { createContext } from "react";

export interface ContactProps {
  name: string;
  lastMessage: string;
  profilePicture: string;
  messages: ChatMessage[];
  type: 'ai' | 'person';
}

export interface ContactListProps {
  contacts: ContactProps[];
} 

export interface ChatMessage {
  id: number;
  text: string;
  timestamp: string;
  isSent: boolean;
}

export const GlobalContext = createContext<any>(null);