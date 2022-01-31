import {
  createContext,
  FC,
  ReactElement,
  useState,
  useContext,
  useEffect,
} from "react";
import { isArrayEquals, getUniqueId } from "../utils/helper";
import { SocketContext } from "./socket";

export interface LoginData {
  mobileNumber: string;
  userName: string;
}

export interface ContactsData {
  userID: string;
  userName: string;
}

export interface UserData {
  id: string;
  status: string;
  name: string;
}

export interface ChatContextType {
  userID: string;
  userName: string;
  contactList: ContactsData[] | [];
  saveLoginData: (data: LoginData) => void;
  logoutLoginData: () => void;
  createContact: (data: ContactsData) => void;
  showCreateForm: boolean;
  handeleCloseForm: () => void;
  handeleOpenForm: () => void;
  showContact: boolean;
  handeleShowContactClose: () => void;
  handeleShowContactOpen: () => void;
  selectConversationUserID: string;
  selectConversationUserData: UserData[];
  selectUserForConversation: (userID: string) => void;
  sendMessage: (data: any) => void;
  formattedConversations: any;
  selectUserConversationMessages: any;
}

export const ChatContext = createContext<ChatContextType>({
  userID: "",
  userName: "",
  contactList: [],
  saveLoginData: (data: LoginData) => {},
  logoutLoginData: () => {},
  createContact: (data: ContactsData) => {},
  showCreateForm: false,
  handeleCloseForm: () => {},
  handeleOpenForm: () => {},
  showContact: false,
  handeleShowContactClose: () => {},
  handeleShowContactOpen: () => {},
  selectConversationUserID: "",
  selectConversationUserData: [],
  selectUserForConversation: (userID: string) => {},
  sendMessage: (data: any) => {},
  formattedConversations: [],
  selectUserConversationMessages: [],
});

export const ChatContextProvider: FC<any> = ({ children }): ReactElement => {
  const [showCreateForm, setShowCreateForm] = useState(false);
  const { socket } = useContext(SocketContext);
  const [showContact, setShowContact] = useState(false);
  const [selectConversationUserID, setConversationUserID] =
    useState<string>("");
  const [messageConversation, setMessageConversation] = useState<any>([]);

  const userID: string = localStorage.getItem("chat-userID") || "";
  const userName: string = localStorage.getItem("chat-userName") || "";
  const contactList: ContactsData[] =
    JSON.parse(`${localStorage.getItem("chat-contactList")}`) || [];

  const selectedConversationUserIDs = selectConversationUserID
    ? selectConversationUserID.split(",")
    : [];

  const selectConversationUserData =
    selectedConversationUserIDs &&
    selectedConversationUserIDs.map((userID: any) => {
      const contact =
        contactList && contactList.find((data) => data.userID === userID);
      return {
        id: userID,
        status: "offline",
        name: (contact && contact.userName) || userID,
      };
    });

  const saveLoginData = ({ mobileNumber, userName }: LoginData) => {
    localStorage.setItem("chat-userID", mobileNumber);
    localStorage.setItem("chat-userName", userName);
  };

  const logoutLoginData = () => {
    localStorage.removeItem("chat-userID");
    localStorage.removeItem("chat-userName");
    localStorage.removeItem("chat-contactList");
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

  useEffect(() => {
    if (socket === null) return;
    socket.on("receive-message", (data: any) => {
      addMessage(data.recipients, data.messageData);
    });
  }, [socket]);

  const sendMessage = (data: any) => {
    const recipients = data.recipientId.split(",");
    delete data.recipientId;
    const messageData = {
      senderId: userID,
      messageSeen: false,
      messageId: getUniqueId(),
      ...data,
    };
    socket.emit("send-message", { recipients, messageData });
    return addMessage(recipients, messageData);
  };

  const addMessage = (recipients: any, messageData: any) => {
    setMessageConversation((prevConversation: any) => {
      let isNewConversation = false;
      const checkRecipentData = prevConversation.map((conversation: any) => {
        if (isArrayEquals(conversation.recipients, recipients)) {
          isNewConversation = true;
          return {
            ...conversation,
            messages: [...conversation.messages, messageData],
            lastMessage: messageData,
          };
        }
        return conversation;
      });

      if (isNewConversation) {
        return checkRecipentData;
      } else {
        return [
          ...prevConversation,
          { recipients, messages: [messageData], lastMessage: messageData },
        ];
      }
    });
  };

  const formattedConversations = messageConversation.map(
    (conversationData: any) => {
      const recipients = conversationData.recipients.map(
        (recipient: string) => {
          const contact =
            contactList &&
            contactList.find((data) => data.userID === recipient);
          return {
            id: recipient,
            status: "offline",
            name: (contact && contact.userName) || recipient,
          };
        }
      );
      const messages = conversationData.messages.map((messageData: any) => {
        const contact =
          contactList &&
          contactList.find((data) => data.userID === messageData.senderId);
        const isMe = messageData.senderId === userID;
        return {
          ...messageData,
          senderName: (contact && contact.userName) || messageData.senderId,
          isMe,
        };
      });
      return { ...conversationData, recipients, messages };
    }
  );

  const selectUserConversationMessages =
    selectedConversationUserIDs &&
    formattedConversations.find((data: any) => {
      const recipients = data.recipients.map((data: any) => data.id);
      return isArrayEquals(recipients, selectedConversationUserIDs);
    });

  return (
    <ChatContext.Provider
      value={{
        userID,
        userName,
        contactList,
        saveLoginData,
        logoutLoginData,
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
        formattedConversations,
        selectUserConversationMessages,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
