import { useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import { useEffect } from "react";
import type { Message } from "../Chat";
import { setMessages } from "../../../redux/messageSlice";

const useMessages = () => {
  const { currentConversationId } = useAppSelector((state) => state.chat);
  const { get } = useFetch();
  const dispatch = useAppDispatch();
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
      dispatch(setMessages(data))
    }
  }, [data]);

  return { data, isLoading, isError }
};
export default useMessages;
