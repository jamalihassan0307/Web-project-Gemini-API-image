import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import {
  GoogleGenerativeAI,
  HarmBlockThreshold,
  HarmCategory,
} from "@google/generative-ai";
import MarkdownIt from "markdown-it";
import { FiImage, FiEdit2, FiPlus, FiMessageSquare } from "react-icons/fi";

const API_KEY = "AIzaSyBdcBFODMDOZOidyb6Kj01gaE-taaoEyhM";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: number;
}

interface Chat {
  id: string;
  name: string;
  messages: ChatMessage[];
  imageUrl?: string;
}

export default function Chat() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat | null>(null);
  const [prompt, setPrompt] = useState("");
  const [isRenaming, setIsRenaming] = useState(false);
  const [newChatName, setNewChatName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const md = new MarkdownIt();

  const { getRootProps, getInputProps } = useDropzone({
    accept: { "image/*": [".png", ".jpg", ".jpeg"] },
    maxFiles: 1,
    onDrop: async (acceptedFiles) => {
      const file = acceptedFiles[0];
      const reader = new FileReader();
      reader.onload = () => {
        const newChat: Chat = {
          id: Date.now().toString(),
          name: file.name,
          messages: [],
          imageUrl: reader.result as string,
        };
        setChats((prev) => [...prev, newChat]);
        setCurrentChat(newChat);
        localStorage.setItem("chats", JSON.stringify([...chats, newChat]));
      };
      reader.readAsDataURL(file);
    },
  });

  useEffect(() => {
    const savedChats = localStorage.getItem("chats");
    if (savedChats) {
      setChats(JSON.parse(savedChats));
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentChat?.imageUrl || !prompt.trim()) return;
    setIsLoading(true);

    const newMessage: ChatMessage = {
      role: "user",
      content: prompt,
      timestamp: Date.now(),
    };

    try {
      const genAI = new GoogleGenerativeAI(API_KEY);
      const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        safetySettings: [
          {
            category: HarmCategory.HARM_CATEGORY_HARASSMENT,
            threshold: HarmBlockThreshold.BLOCK_ONLY_HIGH,
          },
        ],
      });

      // Convert image to base64
      const imageBase64 = currentChat.imageUrl.split(",")[1];

      // Create content parts
      const contents = [
        {
          role: "user",
          parts: [
            {
              inlineData: {
                mimeType: "image/jpeg",
                data: imageBase64,
              },
            },
            { text: prompt },
          ],
        },
      ];

      try {
        // Generate content with streaming
        const result = await model.generateContentStream({ contents });
        let responseText = "";

        // Read from the stream
        for await (const chunk of result.stream) {
          responseText += chunk.text();
        }

        const aiMessage: ChatMessage = {
          role: "assistant",
          content: responseText,
          timestamp: Date.now(),
        };

        const updatedChat = {
          ...currentChat,
          messages: [...currentChat.messages, newMessage, aiMessage],
        };

        setChats((prev) =>
          prev.map((chat) => (chat.id === currentChat.id ? updatedChat : chat))
        );
        setCurrentChat(updatedChat);
        localStorage.setItem(
          "chats",
          JSON.stringify(
            chats.map((chat) =>
              chat.id === currentChat.id ? updatedChat : chat
            )
          )
        );
        setPrompt("");
      } catch (genError) {
        console.error("Generation error:", genError);
        const errorMessage: ChatMessage = {
          role: "assistant",
          content:
            "Sorry, I had trouble analyzing that image. Please try again.",
          timestamp: Date.now(),
        };

        const updatedChat = {
          ...currentChat,
          messages: [...currentChat.messages, newMessage, errorMessage],
        };
        setCurrentChat(updatedChat);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleRename = (chatId: string, newName: string) => {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === chatId ? { ...chat, name: newName } : chat
      )
    );
    setIsRenaming(false);
    localStorage.setItem(
      "chats",
      JSON.stringify(
        chats.map((chat) =>
          chat.id === chatId ? { ...chat, name: newName } : chat
        )
      )
    );
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r">
        <div className="p-4">
          <div
            {...getRootProps()}
            className="w-full p-3 text-center border-2 border-dashed rounded-lg hover:bg-gray-50 cursor-pointer"
          >
            <input {...getInputProps()} />
            <FiPlus className="w-6 h-6 mx-auto mb-2" />
            <p>New Chat</p>
          </div>
        </div>
        <div className="overflow-y-auto">
          {chats.map((chat) => (
            <div
              key={chat.id}
              className={`p-3 cursor-pointer hover:bg-gray-50 flex items-center justify-between ${
                currentChat?.id === chat.id ? "bg-blue-50" : ""
              }`}
              onClick={() => setCurrentChat(chat)}
            >
              <div className="flex items-center space-x-3">
                <FiMessageSquare />
                <span>{chat.name}</span>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setIsRenaming(true);
                  setNewChatName(chat.name);
                }}
                className="p-1 hover:bg-gray-200 rounded"
              >
                <FiEdit2 className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {currentChat ? (
          <>
            <div className="flex-1 overflow-y-auto p-6 space-y-4">
              {currentChat.imageUrl && (
                <div className="max-w-md mx-auto">
                  <img
                    src={currentChat.imageUrl}
                    alt="Uploaded"
                    className="rounded-lg shadow-lg"
                  />
                </div>
              )}
              {currentChat.messages.map((message, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg ${
                    message.role === "user"
                      ? "bg-blue-100 ml-auto"
                      : "bg-gray-100"
                  } max-w-3xl`}
                >
                  <div
                    className="prose"
                    dangerouslySetInnerHTML={{
                      __html: md.render(message.content),
                    }}
                  />
                </div>
              ))}
            </div>
            <div className="p-4 border-t bg-white">
              <form onSubmit={handleSubmit} className="flex space-x-4">
                <input
                  type="text"
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Ask about the image..."
                  className="flex-1 p-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  className={`px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 
                    ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  disabled={isLoading}
                >
                  {isLoading ? "Processing..." : "Send"}
                </button>
              </form>
            </div>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center">
              <FiImage className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-500">
                Upload an image to start a new chat
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Rename Modal */}
      {isRenaming && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg">
            <h3 className="text-lg font-semibold mb-4">Rename Chat</h3>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              className="w-full p-2 border rounded-lg mb-4"
            />
            <div className="flex justify-end space-x-2">
              <button
                onClick={() => setIsRenaming(false)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  if (currentChat) {
                    handleRename(currentChat.id, newChatName);
                  }
                  setIsRenaming(false);
                }}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
