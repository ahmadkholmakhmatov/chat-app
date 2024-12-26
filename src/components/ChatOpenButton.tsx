import React from "react";
import SendIcon from "../icons/SendIcon";

interface ChatOpenButtonProps {
  onClick: () => void;
}

const ChatOpenButton: React.FC<ChatOpenButtonProps> = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-600 text-white p-3 rounded-full shadow-lg focus:outline-none hover:bg-blue-700"
    >
      <span className="flex items-center gap-2">
        Live <SendIcon />
      </span>
    </button>
  );
};

export default ChatOpenButton;
