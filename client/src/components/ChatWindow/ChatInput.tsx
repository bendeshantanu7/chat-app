import { useState } from "react";
import { ChatInput, ChatInputContainer, SendChatButton } from "../styles/ChatStyles";
import { useAppSelector } from "../../redux/hooks";
import socket from "../../socket";
import type { Message } from "./Chat";

const ChatwindowInput = ({messages, setMessages}: {messages: Message[], setMessages: React.Dispatch<React.SetStateAction<Message[]>>}) => {
  const [input, setInput] = useState("");
  const { userSelectedForChat, currentLoggedUser, currentConversationId } =
    useAppSelector((state) => state.chat);

  const sendMessage = () => {
    if (!input.trim()) return;
    setMessages([
      ...messages,
      {
        sender: currentLoggedUser || "",
        text: input,
        recipient: userSelectedForChat.id,
        createdAt: new Date()
      },
    ]);
    socket.emit("send_message", {
      senderId: currentLoggedUser || "",
      receiverId: userSelectedForChat.id,
      content: input,
      conversationId: currentConversationId,
    });
    setInput("");
  };
  return (
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
  );
};

export default ChatwindowInput;
