import { useState, useEffect } from "react";
import {
  ChatContainer,
  ChatInputContainer,
  ChatInput,
  SendChatButton,
} from "../styles/ChatStyles";
import socket from "../../socket";
import { useAppSelector } from "../../redux/hooks";
import useFetch from "../hooks/useFetch";
import ChatMessages from "./ChatMessages";
import useSocket from "../hooks/useSocket";
import ChatWindowHeader from "./ChatWindowHeader";

export interface Message {
  id?: string;
  sender: string;
  text: string;
  status?: string;
  recipient: string;
}

export default function Chat() {
  const { userSelectedForChat, currentLoggedUser, currentConversationId } = useAppSelector(
    (state) => state.chat
  );
  const {messages, setMessages} = useSocket();
  const [input, setInput] = useState("");
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
          };
        })
      );
    };

    if (currentConversationId) {
      fetchMessages();
    }
  }, [currentConversationId]);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      { sender: currentLoggedUser || '', text: input, recipient: userSelectedForChat.id },
    ]);
    socket.emit("send_message", {
      senderId: currentLoggedUser || '',
      receiverId: userSelectedForChat.id,
      content: input,
      conversationId: currentConversationId,
    });
    setInput("");
  };

  return (
    <ChatContainer>
      <ChatWindowHeader />
      <ChatMessages messages={messages} />
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <SendChatButton onClick={sendMessage}>Send</SendChatButton>
      </ChatInputContainer>
    </ChatContainer>
  );
}
