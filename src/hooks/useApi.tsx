import { useQuery, useMutation } from "@tanstack/react-query";
import api from "../utils/api";

interface Message {
  content: string;
  message_type: "sender" | "receiver";
  timestamp: string;
}

const fetchRooms = async () => {
  const response = await api.get("/api/mess/get_room/");
  return response.data;
};

export const useFetchRooms = () => {
  return useQuery({
    queryKey: ["rooms"],
    queryFn: fetchRooms,
    refetchInterval: 2000,
  });
};
export const useFetchMessages = (room_id?: number) => {
  return useQuery<Message[], Error>({
    queryKey: ["messages", room_id],
    queryFn: async () => {
      const response = await api.get(`/api/mess/all_messages/`, {
        params: { room_id },
      });
      return response.data;
    },
    enabled: !!room_id,
    refetchInterval: 1000,
  });
};

export const useSendMessage = () => {
  return useMutation<
    Message,
    Error,
    { content: string; room_id: number; message_type: "sender" | "receiver" }
  >({
    mutationFn: async ({ content, room_id, message_type }) => {
      const response = await api.post(`/api/mess/send/${room_id}/`, {
        content,
        message_type,
      });
      return response.data;
    },
  });
};
