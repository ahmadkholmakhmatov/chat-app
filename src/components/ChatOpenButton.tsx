import React from "react";
import { useMutation } from "@tanstack/react-query";
import api from "../utils/api"; // Import the API instance
import SendIcon from "../icons/SendIcon";

interface ChatOpenButtonProps {
  onClick: () => void;
}

const ChatOpenButton: React.FC<ChatOpenButtonProps> = ({ onClick }) => {
  // Mutation to handle API request for creating a new room
  const createRoomMutation = useMutation({
    mutationFn: async (room_id: number) => {
      const response = await api.post(`/api/mess/new_room/`, { room_id }); // POST request
      return response.data; // Return the room data
    },
    onSuccess: (data) => {
      // Store the room_id in local storage
      localStorage.setItem("room_id", data.pk);
      console.log("Room created successfully:", data);
      onClick(); // Proceed to open chat
    },
    onError: (error) => {
      console.error("Failed to create room:", error);
    },
  });

  // Function to generate a random number between 1 and 15,000,000
  const generateRandomRoomId = (): number => {
    return Math.floor(Math.random() * 15000000) + 1; // Random number in range
  };

  // Handle button click
  const handleButtonClick = async () => {
    const storedRoomId = localStorage.getItem("room_id");

    if (storedRoomId) {
      console.log("Using stored room_id:", storedRoomId);
      onClick(); // Proceed to open chat
    } else {
      // Generate a random room ID
      const newRoomId = generateRandomRoomId();
      console.log("Generated new room_id:", newRoomId);

      // Trigger the mutation to create the room
      createRoomMutation.mutate(newRoomId);
    }
  };

  return (
    <button
      onClick={handleButtonClick}
      className="fixed bottom-0 right-0 bg-blue-600 text-white px-4 py-2 rounded-full shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition-colors duration-200"
    >
      <span className="flex items-center gap-2">
        Live <SendIcon />
      </span>
    </button>
  );
};

export default ChatOpenButton;
