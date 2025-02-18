import { useState, useEffect } from "react";
import { useChat } from "../contexts/ChatContext";
import ChatInput from "../components/Chat/ChatInput";
import ChatMessage from "../components/Chat/ChatMessage";
import ImageUpload from "../components/Chat/ImageUpload";
import Suggestions from "../components/Chat/Suggestions";
import "../styles/chat.css";

function Chat() {
  const {
    currentChat,
    messages,
    sendMessage,
    updateChatName,
    deleteChat,
    copyMessage,
  } = useChat();

  const [imageMode, setImageMode] = useState(false);

  return (
    <div className="chat-container">
      <div className="chat-header">
        <h2>{currentChat?.name || "New Chat"}</h2>
        <div className="chat-actions">
          <button onClick={() => setImageMode(!imageMode)}>
            {imageMode ? "Text Mode" : "Image Mode"}
          </button>
          {currentChat && (
            <>
              <button onClick={() => updateChatName(currentChat.id)}>
                Rename
              </button>
              <button onClick={() => deleteChat(currentChat.id)}>Delete</button>
            </>
          )}
        </div>
      </div>

      <div className="messages-container">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
            onCopy={() => copyMessage(message.content)}
          />
        ))}
      </div>

      {imageMode ? (
        <ImageUpload
          onUpload={(image) => sendMessage({ type: "image", content: image })}
        />
      ) : (
        <>
          <Suggestions
            onSelect={(suggestion) =>
              sendMessage({ type: "text", content: suggestion })
            }
          />
          <ChatInput
            onSend={(content) => sendMessage({ type: "text", content })}
          />
        </>
      )}
    </div>
  );
}

export default Chat;
