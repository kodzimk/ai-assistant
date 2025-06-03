import { createContext } from "react";

export interface ContactProps {
  name: string;
  lastMessage: string;
  profilePicture: string;
}

export interface ContactListProps {
  contacts: ContactProps[];
} 

export const GlobalContext = createContext();