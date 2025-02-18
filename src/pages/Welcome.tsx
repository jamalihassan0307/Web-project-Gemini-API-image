import React from "react";
import { useNavigate } from "react-router-dom";

export default function Welcome() {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center bg-cover bg-center text-white"
      style={{
        backgroundImage: 'url("https://source.unsplash.com/1600x900/?baking")',
      }}
    >
      <div className="bg-black/30 p-12 rounded-3xl backdrop-blur-sm">
        <h1 className="text-5xl font-bold mb-6 text-center">
          Welcome to AI Baking Assistant
        </h1>
        <p className="text-xl mb-8 text-center">
          Start exploring the world of AI-powered baking!
        </p>
        <button
          onClick={() => navigate("/chat")}
          className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition
                     transform hover:scale-105 mx-auto block"
        >
          Open Chat Room
        </button>
      </div>
    </div>
  );
}
