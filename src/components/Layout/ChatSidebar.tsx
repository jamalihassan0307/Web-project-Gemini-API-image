import { useAuth } from "../../contexts/AuthContext";
import { FiMessageSquare } from "react-icons/fi";

interface Chat {
  id: string;
  name: string;
}

export default function ChatSidebar({
  chats,
  currentChat,
  onChatSelect,
}: {
  chats: Chat[];
  currentChat: Chat | null;
  onChatSelect: (chat: Chat) => void;
}) {
  const { user } = useAuth();

  return (
    <div className="w-64 bg-white border-r h-screen flex flex-col">
      <div className="flex-1 overflow-y-auto p-4">
        <div className="mb-4">
          <h2 className="text-lg font-semibold text-gray-700">Your Chats</h2>
        </div>

        <div className="space-y-2">
          {chats.map((chat) => (
            <button
              key={chat.id}
              onClick={() => onChatSelect(chat)}
              className={`w-full text-left px-4 py-3 rounded-lg flex items-center space-x-3
                ${
                  currentChat?.id === chat.id
                    ? "bg-blue-50 text-blue-600"
                    : "hover:bg-gray-50"
                }`}
            >
              <FiMessageSquare className="flex-shrink-0" />
              <span className="truncate">{chat.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* User Profile Section at Bottom */}
      <div className="border-t p-4">
        <div className="flex items-center space-x-3">
          <img
            src={user?.profileImage || "https://via.placeholder.com/32"}
            alt="Profile"
            className="w-8 h-8 rounded-full"
          />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-gray-900 truncate">
              {user?.username}
            </p>
            <p className="text-xs text-gray-500 truncate">{user?.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
