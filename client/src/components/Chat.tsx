import { useState, useRef, useEffect } from "react"
import { ChatContainer, ChatMessageContainer, ChatBubble, ChatInputContainer, ChatInput, SendChatButton, ChatHeader } from "./styles/ChatStyles"
import { jwtDecode } from "jwt-decode";
import socket from "../socket";
import { useAppSelector } from "../redux/hooks";


export default function Chat() {
  const [messages, setMessages] = useState<{ sender: string; text: string, recipient: string }[]>([])
  const {userSelectedForChat, currentConversationId} = useAppSelector(state => state.chat)
  const [currentUserId, setCurrentUserId] = useState('')
  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    socket.connect();

    const token = sessionStorage.getItem("token")
    const currentUser: { id: string } = jwtDecode(token as string)
    setCurrentUserId(currentUser?.id)
    socket.emit("register", { userId: currentUser.id })

    socket.on("receive_message", (data) => {
      console.log('data', data)
      if (data.conversationId === currentConversationId) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { id: data.id, sender: data.senderId, text: data.content, recipient: currentUserId }
        ]);
      }
    });
    return () => {
        socket.off("receive_message");
        socket.disconnect();
    }

  },[])

  useEffect(() => {
    const fetchMessages = async () => {
      const response = await fetch(`http://localhost:3000/conversations/messages/${currentConversationId}`);
      const data = await response.json();
      setMessages(data.map((message: any) => {
        return {
          sender: message.senderId,
          text: message.message,
          recipient: message.recipientId,
          conversationId: message.conversationId
        };
      }));
    };

    if (currentConversationId) {
      fetchMessages();
    }

  },[currentConversationId])

  const sendMessage = () => {
    if (!input.trim()) return
    setMessages([...messages, { sender: currentUserId, text: input, recipient: userSelectedForChat.id }])
    socket.emit("send_message", {
    senderId: currentUserId,
    receiverId: userSelectedForChat.id,
    content: input,
    conversationId: currentConversationId
  })
    setInput("")
  }

  // ✅ Auto scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  return (
    <ChatContainer>
        <ChatHeader>
        {userSelectedForChat ? `${userSelectedForChat.username}` : "Select a user to chat"}
        </ChatHeader>
      {/* Chat Messages */}
      <div style={{ flex: 1, overflowY: "auto", padding: "10px", marginBottom: "60px" }}>
        {messages.map((msg, i) => (
        <ChatMessageContainer sender={msg.sender === currentUserId ? "me" : "other"} key={`${msg.text}-${i}`}>
            <ChatBubble sender={msg.sender === currentUserId ? "me" : "other"}>
                {msg.text}
            </ChatBubble>
        </ChatMessageContainer>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Chat Input */}
      <ChatInputContainer>
        <ChatInput
          type="text"
          placeholder="Type a message..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <SendChatButton onClick={sendMessage}>
          Send
        </SendChatButton>
      </ChatInputContainer>
    </ChatContainer>
  )
}
