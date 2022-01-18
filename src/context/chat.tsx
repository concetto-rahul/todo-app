import { createContext, FC, ReactElement, useState } from "react";

export interface LoginData {
  mobileNumber: string;
  userName: string;
}

export interface ContactsData {
  userID: string;
  userName: string;
}

export interface ChatContextType {
  userID: string;
  userName: string;
  contactList: ContactsData[] | [];
  saveLoginData: (data: LoginData) => void;
  createContact: (data: ContactsData) => void;
  showCreateForm: boolean;
  handeleCloseForm: () => void;
  handeleOpenForm: () => void;
}

export const ChatContext = createContext<ChatContextType>({
  userID: "",
  userName: "",
  contactList: [],
  saveLoginData: (data: LoginData) => {},
  createContact: (data: ContactsData) => {},
  showCreateForm: false,
  handeleCloseForm: () => {},
  handeleOpenForm: () => {},
});

export const ChatContextProvider: FC<any> = ({ children }): ReactElement => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const userID: string = localStorage.getItem("chat-userID") || "";
  const userName: string = localStorage.getItem("chat-userName") || "";
  const contactList: ContactsData[] =
    JSON.parse(`${localStorage.getItem("chat-contactList")}`) || [];
  console.log(contactList);
  const saveLoginData = ({ mobileNumber, userName }: LoginData) => {
    localStorage.setItem("chat-userID", JSON.stringify(mobileNumber));
    localStorage.setItem("chat-userName", JSON.stringify(userName));
  };

  const createContact = (data: ContactsData) => {
    let contactData = contactList;
    contactData = [...contactList, data];
    localStorage.setItem("chat-contactList", JSON.stringify(contactData));
  };

  const handeleCloseForm = () => {
    setShowCreateForm(false);
  };

  const handeleOpenForm = () => {
    setShowCreateForm(true);
  };

  return (
    <ChatContext.Provider
      value={{
        userID,
        userName,
        contactList,
        saveLoginData,
        createContact,
        showCreateForm,
        handeleCloseForm,
        handeleOpenForm,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
