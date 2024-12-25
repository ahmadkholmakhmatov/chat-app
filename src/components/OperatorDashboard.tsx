import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";

const OperatorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null);

  useEffect(() => {
    if (!user) {
      navigate("/signin"); // Redirect to sign-in if user is not authenticated
    }
  }, [user, navigate]); // Add `navigate` and `user` as dependencies

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleSelectRoom = (room_id: string) => {
    setSelectedRoom(room_id);
  };

  if (!user) {
    return null; // Optionally render nothing until navigation occurs
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-[780px] h-[720px] bg-white rounded-lg shadow-lg overflow-hidden flex">
        <Sidebar onSelectUser={handleSelectRoom} activeUser={selectedRoom} />
        <div className="flex flex-col flex-grow">
          <header className="bg-blue-600 text-white p-2 flex justify-between items-center">
            <h1 className="text-xl font-bold">Operator Dashboard</h1>
            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-2 py-1 rounded text-sm"
            >
              Logout
            </button>
          </header>
          <div className="flex-grow relative">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage:
                  'url("/images/background.svg?height=720&width=520")',
              }}
            ></div>
            {selectedRoom ? (
              <ChatRoom isOperator={true} selectedUser={selectedRoom} />
            ) : (
              <div className="flex items-center justify-center h-full relative z-10">
                <p className="text-sm text-gray-500">
                  Select a room to start chatting
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
