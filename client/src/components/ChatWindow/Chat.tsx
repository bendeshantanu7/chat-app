import { ChatContainer } from "../styles/ChatStyles";
import ChatMessages from "./ChatMessages";
import useSocket from "../hooks/useSocket";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatwindowInput from "./ChatInput";
import useMessages from "./hooks/useMessages";

export interface Message {
  id?: string;
  sender: string;
  text: string;
  status?: string;
  recipient: string;
  createdAt?: Date;
}

export default function Chat() {
  const { messages, setMessages } = useSocket();
  const { isLoading, isError } = useMessages(setMessages);

  if (isLoading) return <p>Loading messages...</p>;
  if (isError) return <p>Error loading messages</p>;

  return (
    <ChatContainer>
      <ChatWindowHeader />
      <ChatMessages messages={messages} />
      <ChatwindowInput messages={messages} setMessages={setMessages} />
    </ChatContainer>
  );
}
