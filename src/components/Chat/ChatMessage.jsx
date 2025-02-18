import React from "react";

function ChatMessage({ message, onCopy }) {
  const isUser = message.type === "user";

  return (
    <div className={`message ${isUser ? "user-message" : "ai-message"}`}>
      <div className="message-content">
        <p>{message.content}</p>
        {!isUser && (
          <button
            className="copy-button"
            onClick={() => onCopy(message.content)}
          >
            Copy
          </button>
        )}
      </div>
    </div>
  );
}

export default ChatMessage;
