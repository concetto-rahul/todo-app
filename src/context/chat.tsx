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
  showContact: boolean;
  handeleShowContactClose: () => void;
  handeleShowContactOpen: () => void;
  selectConversationUserID: string;
  selectConversationUserData: {
    userID?: string;
    userName?: string;
  };
  selectUserForConversation: (userID: string) => void;
  sendMessage: (data: any) => void;
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
  showContact: false,
  handeleShowContactClose: () => {},
  handeleShowContactOpen: () => {},
  selectConversationUserID: "",
  selectConversationUserData: {},
  selectUserForConversation: (userID: string) => {},
  sendMessage: (data: any) => {},
});

export const ChatContextProvider: FC<any> = ({ children }): ReactElement => {
  
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showContact, setShowContact] = useState(false);
  const [selectConversationUserID, setConversationUserID] = useState("");
  const [messageConversation, setMessageConversation] = useState<any>([]);
  const userID: string = localStorage.getItem("chat-userID") || "";
  const userName: string = localStorage.getItem("chat-userName") || "";
  const contactList: ContactsData[] =
    JSON.parse(`${localStorage.getItem("chat-contactList")}`) || [];
  const selectConversationUserData = selectConversationUserID
    ? contactList.filter((data) => data.userID === selectConversationUserID)[0]
    : {};
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

  const handeleShowContactClose = () => {
    setShowContact(false);
  };

  const handeleShowContactOpen = () => {
    setShowContact(true);
  };

  const selectUserForConversation = (userID: string) => {
    setShowContact(false);
    setConversationUserID(userID);
  };

  const sendMessage = (data: any) => {
    data.senderId = userID;
    return addMessage(data);
  };

  const addMessage = ({
    recipientId,
    message,
    contentType,
    attachments,
    createdAt,
    senderId,
  }: any) => {
    let messageData = {
      senderId,
      message,
      contentType,
      attachments,
      createdAt,
    };

    setMessageConversation((prevConversation: any) => {
      let isNewConversation = false;
      const checkRecipentData = prevConversation.map((conversation: any) => {
        if (conversation.recipients.includes(recipientId)) {
          isNewConversation = true;
          return {
            ...conversation,
            messages: [...conversation.messages, messageData],
          };
        }
        return conversation;
      });
      if (isNewConversation) {
        return checkRecipentData;
      } else {
        return [
          ...prevConversation,
          { recipients: [recipientId], messages: [messageData] },
        ];
      }
    });
  };

  console.log("ChatContextProvider",messageConversation);

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
        showContact,
        handeleShowContactClose,
        handeleShowContactOpen,
        selectConversationUserID,
        selectConversationUserData,
        selectUserForConversation,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
