import { useState } from "react";
import { ChatInput, ChatInputContainer, SendChatButton } from "../styles/ChatStyles";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import socket from "../../socket";
import { setMessages } from "../../redux/messageSlice";

const ChatwindowInput = () => {
  const [input, setInput] = useState("");
  const { userSelectedForChat, currentLoggedUser, currentConversationId } =
    useAppSelector((state) => state.chat);
  const { messages } = useAppSelector(state => state.message)
  const dispatch = useAppDispatch()

  const sendMessage = () => {
    if (!input.trim()) return;
    console.log('send messages', [
      ...messages,
      {
        sender: currentLoggedUser || "",
        text: input,
        recipient: userSelectedForChat.id,
        createdAt: new Date()
      },
    ])
    dispatch(setMessages([
      ...messages,
      {
        sender: currentLoggedUser || "",
        text: input,
        recipient: userSelectedForChat.id,
        createdAt: new Date()
      },
    ]));
    // console.log('message', {
    //   senderId: currentLoggedUser || "",
    //   receiverId: userSelectedForChat.id,
    //   content: input,
    //   conversationId: currentConversationId,
    // })
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
