import { useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import { useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import type { Message } from "../Chat";

const useMessages = (setMessages: (messages: Message[]) => void) => {
  const { currentConversationId } = useAppSelector((state) => state.chat);
  const { get } = useFetch();
  const { data, isLoading, isError } = useQuery({
    queryKey: ["messages", currentConversationId],
    queryFn: async () => {
      const data = await get(`conversations/messages/${currentConversationId}`);

      return data.map((message: any) => {
        return {
          id: message._id,
          sender: message.senderId,
          text: message.message,
          recipient: message.recipientId,
          status: message.status,
          conversationId: message.conversationId,
          createdAt: message.createdAt,
        };
      });
    },
  });

  useEffect(() => {
    if (data) {
      setMessages(data);
    }
  }, [data, setMessages]);

  return { isLoading, isError }
};
export default useMessages;
