import { useChat } from "../../contexts/ChatContext";
import { useAuth } from "../../contexts/AuthContext";
import "./Sidebar.css";

function Sidebar({ isOpen, onClose }) {
  const { chats, createNewChat, switchChat, currentChat } = useChat();
  const { logout } = useAuth();

  return (
    <aside className={`sidebar ${isOpen ? "open" : ""}`}>
      <div className="sidebar-header">
        <button className="new-chat-btn" onClick={createNewChat}>
          New Chat
        </button>
        <button className="close-btn" onClick={onClose}>
          ×
        </button>
      </div>

      <div className="chats-list">
        {chats.map((chat) => (
          <button
            key={chat.id}
            className={`chat-item ${
              chat.id === currentChat?.id ? "active" : ""
            }`}
            onClick={() => switchChat(chat.id)}
          >
            {chat.name}
          </button>
        ))}
      </div>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={logout}>
          Logout
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;
