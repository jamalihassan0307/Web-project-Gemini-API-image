import React from "react";

const suggestions = [
  "Tell me about yourself",
  "What can you help me with?",
  "How does this work?",
  "What are your capabilities?",
];

function Suggestions({ onSelect }) {
  return (
    <div className="suggestions">
      {suggestions.map((suggestion, index) => (
        <button
          key={index}
          className="suggestion-chip"
          onClick={() => onSelect(suggestion)}
        >
          {suggestion}
        </button>
      ))}
    </div>
  );
}

export default Suggestions;
