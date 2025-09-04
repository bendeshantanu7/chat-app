import { useEffect, useRef } from "react";
import { DeliveredIcon, SentIcon } from "../icons/MessageStatus";
import { ChatBubble, ChatMessageContainer, ChatWindowContainer } from "../styles/ChatStyles";
import type { Message } from "./Chat";
import { useAppSelector } from "../../redux/hooks";


const ChatMessages = ({messages}: {messages: Message[]}) => {
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { currentLoggedUser} = useAppSelector((state) => state.chat);

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView()
      }, [messages])
  return (
    <ChatWindowContainer>
      {messages.map((msg: Message, i) => (
        <ChatMessageContainer
          sender={msg.sender === currentLoggedUser ? "me" : "other"}
          key={`${msg.text}-${i}`}
        >
          <ChatBubble sender={msg.sender === currentLoggedUser ? "me" : "other"}>
            {msg.text}
            {msg.sender === currentLoggedUser && (
              <span>
                {msg.status === "sent" && <SentIcon />}
                {msg.status === "delivered" && <DeliveredIcon />}
              </span>
            )}
          </ChatBubble>
        </ChatMessageContainer>
      ))}
      <div ref={messagesEndRef} />
    </ChatWindowContainer>
  );
};

export default ChatMessages;
