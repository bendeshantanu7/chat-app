import { useEffect } from "react";
import { ChatContainer } from "../styles/ChatStyles";
import { useAppSelector } from "../../redux/hooks";
import useFetch from "../hooks/useFetch";
import ChatMessages from "./ChatMessages";
import useSocket from "../hooks/useSocket";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatwindowInput from "./ChatInput";

export interface Message {
  id?: string;
  sender: string;
  text: string;
  status?: string;
  recipient: string;
  createdAt?: Date;
}

export default function Chat() {
  const { currentConversationId } = useAppSelector((state) => state.chat);
  const { messages, setMessages } = useSocket();
  const { get } = useFetch();

  useEffect(() => {
    const fetchMessages = async () => {
      const data = await get(`conversations/messages/${currentConversationId}`);
      setMessages(
        data.map((message: any) => {
          return {
            id: message._id,
            sender: message.senderId,
            text: message.message,
            recipient: message.recipientId,
            status: message.status,
            conversationId: message.conversationId,
            createdAt: message.createdAt
          };
        })
      );
    };

    if (currentConversationId) {
      fetchMessages();
    }
  }, [currentConversationId]);

  return (
    <ChatContainer>
      <ChatWindowHeader />
      <ChatMessages messages={messages} />
      <ChatwindowInput messages={messages} setMessages={setMessages} />
    </ChatContainer>
  );
}
