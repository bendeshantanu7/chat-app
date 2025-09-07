import { useEffect, useRef } from "react";
import { DeliveredIcon, SentIcon } from "../icons/MessageStatus";
import {
  ChatBubble,
  ChatMessageContainer,
  ChatWindowContainer,
  TimestampContainer,
} from "../styles/ChatStyles";
import type { Message } from "./Chat";
import { useAppSelector } from "../../redux/hooks";

const ChatMessages = ({ messages }: { messages: Message[] }) => {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { currentLoggedUser } = useAppSelector((state) => state.chat);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView();
  }, [messages]);
  return (
    <ChatWindowContainer>
      {messages.map((msg: Message, i) => (
        <ChatMessageContainer
          sender={msg.sender === currentLoggedUser ? "me" : "other"}
          key={`${msg.text}-${i}`}
        >
          <ChatBubble
            sender={msg.sender === currentLoggedUser ? "me" : "other"}
          >
            <div>
              <div>{msg.text}</div>
            </div>
            <TimestampContainer>
              {msg?.createdAt &&
                new Date(msg.createdAt).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              {msg.sender === currentLoggedUser && (
                <>
                  {msg.status === "sent" && <SentIcon />}
                  {msg.status === "delivered" && <DeliveredIcon />}
                </>
              )}
            </TimestampContainer>
          </ChatBubble>
        </ChatMessageContainer>
      ))}
      <div ref={messagesEndRef} />
    </ChatWindowContainer>
  );
};

export default ChatMessages;
