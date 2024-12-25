import React, { useState } from "react";
import { Link } from "react-router-dom";
import ChatRoom from "./ChatRoom";
import ChatOpenButton from "./ChatOpenButton";

const UserChat: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);

  const handleChatOpen = () => {
    setIsChatOpen(true);
  };

  const handleChatClose = () => {
    setIsChatOpen(false);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      {!isChatOpen && <ChatOpenButton onClick={handleChatOpen} />}
      {isChatOpen && (
        <div className="w-[600px] h-[720px] bg-white rounded-lg shadow-lg overflow-hidden flex flex-col">
          <header className="bg-blue-600 text-white p-2 flex justify-between items-center">
            <h1 className="text-xl font-bold">Test Chat</h1>
            <div className="flex items-center space-x-2">
              <Link
                to="/signin"
                className="bg-white text-blue-600 px-3 py-1 rounded text-sm"
              >
                Sign in as Operator
              </Link>
              <button
                onClick={handleChatClose}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </header>
          <div className="flex-grow relative">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage:
                  'url("/images/background.svg?height=720&width=520")',
              }}
            ></div>
            <ChatRoom isOperator={false} />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserChat;
