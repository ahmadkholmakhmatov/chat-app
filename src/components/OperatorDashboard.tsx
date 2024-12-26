import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import ChatRoom from "./ChatRoom";
import Sidebar from "./Sidebar";
import Burger from "../icons/Burger";
import Cancel from "../icons/Cancel";

const OperatorDashboard: React.FC = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [selectedRoom, setSelectedRoom] = useState<number | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); // Track sidebar visibility

  useEffect(() => {
    const token = localStorage.getItem("authToken");

    if (!user || !token) {
      logout();
      navigate("/signin");
    }
  }, [user, navigate, logout]);

  const handleLogout = () => {
    logout();
    navigate("/signin");
  };

  const handleSelectRoom = (room_id: number) => {
    setSelectedRoom(room_id);
    setIsSidebarVisible(false); // Hide sidebar on small screens when a room is selected
  };

  if (!user) {
    return null;
  }

  return (
    <div className="flex items-center justify-center sm:min-h-screen bg-gray-100">
      <div className="sm:w-[780px] sm:h-[720px] w-full h-[100dvh] bg-white rounded-lg shadow-lg overflow-hidden flex">
        <div className="w-1/3 sm:inline-block hidden">
          <Sidebar onSelectUser={handleSelectRoom} activeUser={selectedRoom} />
        </div>
        <div className="flex flex-col flex-grow h-full">
          <header className="bg-blue-600 text-white p-2 flex justify-between items-center">
            <button
              onClick={() => setIsSidebarVisible(!isSidebarVisible)}
              className="sm:hidden bg-white text-blue-600 px-2 py-1 rounded text-sm"
            >
              {isSidebarVisible ? <Cancel /> : <Burger />}
            </button>

            <h1 className="text-xl font-bold">Operator Dashboard</h1>

            <button
              onClick={handleLogout}
              className="bg-white text-blue-600 px-2 py-1 rounded text-sm"
            >
              Logout
            </button>
          </header>

          <div className="h-full relative">
            <div
              className="absolute inset-0 bg-cover bg-center opacity-10"
              style={{
                backgroundImage:
                  'url("/images/background.svg?height=720&width=520")',
              }}
            ></div>
            {isSidebarVisible && (
              <div className="absolute inset-0 bg-gray-200 z-10 md:static md:w-1/3">
                <Sidebar
                  onSelectUser={handleSelectRoom}
                  activeUser={selectedRoom}
                />
              </div>
            )}

            {!isSidebarVisible && (
              <div className="h-full">
                {selectedRoom ? (
                  <ChatRoom isOperator={true} selectedUser={selectedRoom} />
                ) : (
                  <div className="flex items-center justify-center h-screen">
                    <p className="text-sm text-gray-500">
                      Select a room to start chatting
                    </p>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperatorDashboard;
