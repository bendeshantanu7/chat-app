import { useQuery } from "@tanstack/react-query";
import useFetch from "../../hooks/useFetch";
import { useAppSelector } from "../../../redux/hooks";

const useMessages = () => {
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

  return { data, isLoading, isError }
};
export default useMessages;
