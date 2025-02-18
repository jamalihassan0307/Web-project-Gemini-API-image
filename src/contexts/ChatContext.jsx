import { createContext, useContext, useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  getChats,
  saveChat,
  updateChat,
  deleteChat,
} from "../services/storage";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [chats, setChats] = useState([]);
  const [currentChat, setCurrentChat] = useState(null);
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const savedChats = getChats();
    setChats(savedChats);
  }, []);

  const createNewChat = () => {
    const newChat = {
      id: uuidv4(),
      name: "New Chat",
      createdAt: new Date().toISOString(),
      messages: [],
    };
    saveChat(newChat);
    setChats([...chats, newChat]);
    setCurrentChat(newChat);
    setMessages([]);
  };

  const switchChat = (chatId) => {
    const chat = chats.find((c) => c.id === chatId);
    if (chat) {
      setCurrentChat(chat);
      setMessages(chat.messages);
    }
  };

  const sendMessage = async (message) => {
    const newMessage = {
      id: uuidv4(),
      ...message,
      timestamp: new Date().toISOString(),
    };

    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);

    if (currentChat) {
      const updatedChat = {
        ...currentChat,
        messages: updatedMessages,
      };
      updateChat(currentChat.id, updatedChat);
    }
  };

  return (
    <ChatContext.Provider
      value={{
        chats,
        currentChat,
        messages,
        createNewChat,
        switchChat,
        sendMessage,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
