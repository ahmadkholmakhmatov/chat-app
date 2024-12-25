import React from "react";
import { useFetchRooms } from "../hooks/useApi";

interface SidebarProps {
  onSelectUser: (room_id: string) => void;
  activeUser: string | null;
}

const Sidebar: React.FC<SidebarProps> = ({ onSelectUser, activeUser }) => {
  const { data: rooms = [], isLoading, isError } = useFetchRooms();

  return (
    <div className="w-1/3 bg-gray-200 h-full overflow-y-auto">
      <h2 className="text-sm font-semibold p-2 bg-gray-300 sticky top-0">
        Chat Rooms
      </h2>
      {isLoading ? (
        <p className="text-sm text-center p-2">Loading rooms...</p>
      ) : isError ? (
        <p className="text-sm text-center p-2 text-red-500">
          Failed to load rooms
        </p>
      ) : (
        <ul className="text-sm">
          {rooms.map((room: { room_id: string; room_name: string }) => (
            <li
              key={room.room_id}
              className={`p-2 hover:bg-gray-300 cursor-pointer flex items-center ${
                activeUser === room.room_id ? "bg-blue-100" : ""
              }`}
              onClick={() => onSelectUser(room.room_id)}
            >
              <span className="flex-grow">{"User" + room.room_id}</span>
              {activeUser === room.room_id && (
                <span
                  className="w-2 h-2 bg-green-500 rounded-full"
                  aria-hidden="true"
                />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Sidebar;
