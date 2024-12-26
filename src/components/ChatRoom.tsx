import React, { useState } from "react";
import { useFetchMessages, useSendMessage } from "../hooks/useApi";
import SendIcon from "../icons/SendIcon";

interface Message {
  content: string;
  message_type: "sender" | "receiver";
  timestamp: string;
}

interface ChatRoomProps {
  isOperator: boolean;
  selectedUser?: number;
}

const ChatRoom: React.FC<ChatRoomProps> = ({ isOperator, selectedUser }) => {
  const [inputMessage, setInputMessage] = useState("");

  const roomId = isOperator
    ? selectedUser
    : Number(localStorage.getItem("room_id"));

  const {
    data: messages = [],
    isLoading,
    isError,
    refetch: refetchMessages,
  } = useFetchMessages(roomId);

  const sendMessageMutation = useSendMessage();

  const handleSendMessage = () => {
    if (inputMessage.trim() && roomId) {
      sendMessageMutation.mutate(
        {
          content: inputMessage,
          room_id: roomId,
          message_type: isOperator ? "receiver" : "sender",
        },
        {
          onSuccess: () => {
            setInputMessage("");
            refetchMessages();
          },
        }
      );
    }
  };

  const renderMessageContent = (message: Message) => {
    const isUserMessage = message.message_type === "sender";
    const isOperatorMessage = message.message_type === "receiver";

    return (
      <div
        key={message.timestamp}
        className={`flex ${
          (isUserMessage && !isOperator) || (isOperatorMessage && isOperator)
            ? "justify-end"
            : "justify-start"
        }`}
      >
        <div
          className={`max-w-[70%] px-3 py-2 rounded-lg text-sm ${
            (isUserMessage && !isOperator) || (isOperatorMessage && isOperator)
              ? "bg-blue-600 text-white"
              : "bg-gray-300 text-gray-800"
          }`}
        >
          <p>{message.content}</p>
          <span className="text-xs text-gray-400">
            {message.timestamp !== "Invalid Date"
              ? new Date(message.timestamp).toLocaleTimeString()
              : ""}
          </span>
        </div>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full relative">
      {/* Header */}
      {isOperator && selectedUser && (
        <div className="bg-gray-200 p-2 text-center text-sm">
          <span className="font-semibold">Chatting with: {selectedUser}</span>
        </div>
      )}

      {/* Scrollable Messages Container */}
      <div className="flex flex-col-reverse flex-grow overflow-y-auto p-2 space-y-2 relative z-10 h-[200px]">
        {isLoading ? (
          <div className="text-center text-gray-500">Loading messages...</div>
        ) : isError ? (
          <div className="text-red-500 text-center">
            Failed to load messages. Please try again.
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            {messages.map((message: Message) => renderMessageContent(message))}
          </div>
        )}
      </div>

      {/* Fixed Input Area */}
      <div className="p-2 flex justify-between items-center bg-white bg-opacity-90 border-t relative z-10">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSendMessage();
          }}
          placeholder="Type a message..."
          className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleSendMessage}
          className="ml-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          <SendIcon />
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
