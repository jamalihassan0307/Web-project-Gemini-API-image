const STORAGE_KEY = "ai_chat_data";

export const saveChat = (chat) => {
  const chats = getChats();
  chats.push(chat);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};

export const getChats = () => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};

export const updateChat = (chatId, updates) => {
  const chats = getChats();
  const index = chats.findIndex((chat) => chat.id === chatId);
  if (index !== -1) {
    chats[index] = { ...chats[index], ...updates };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
  }
};

export const deleteChat = (chatId) => {
  const chats = getChats().filter((chat) => chat.id !== chatId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(chats));
};
