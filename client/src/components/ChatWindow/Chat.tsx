import { ChatContainer } from "../styles/ChatStyles";
import ChatMessages from "./ChatMessages";
import ChatWindowHeader from "./ChatWindowHeader";
import ChatwindowInput from "./ChatInput";
import useMessages from "./hooks/useMessages";
import EmptyChatState from "./EmptyChatState";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { useEffect, useRef } from "react";
import socket from "../../socket";
import { jwtDecode } from "jwt-decode";
import { setCurrentLoggedUser } from "../../redux/chatSlice";
import { addMessage, setMessages, updateMessageStatus } from "../../redux/messageSlice";

export interface Message {
  id?: string;
  sender: string;
  text: string;
  status?: string;
  recipient: string;
  createdAt?: Date;
}

export default function Chat() {
  const { data } = useMessages()
  const { recentChats, userSelectedForChat } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch()
  const { currentConversationId, currentLoggedUser } = useAppSelector((state) => state.chat);
  const currentConversationRef = useRef(currentConversationId);

  // if (isLoading) return <p>Loading messages...</p>;
  // if (isError) return <p>Error loading messages</p>;

  useEffect(() => {
    if (data) {
      dispatch(setMessages(data))
    }
  }, [data]);

  useEffect(() => {
    currentConversationRef.current = currentConversationId;
  }, [currentConversationId]);

  useEffect(() => {
    // Connect if not already connected
    if (!socket.connected) {
      socket.connect();
    }

    const handleConnect = () => {
      console.log("Socket connected:", socket.id);
      const token = sessionStorage.getItem("token");
      if (token) {
        try {
          const currentUser: any = jwtDecode(token);
          const userId = currentUser.id || currentUser.sub;
          dispatch(setCurrentLoggedUser(userId));
          socket.emit("register", { userId });
        } catch (e) {
          console.error("Error decoding token for socket registration:", e);
        }
      }
    };

    const handleReceiveMessage = (data: any) => {
      console.log('socket receive_message:', data);

      // Acknowledge delivery
      socket.emit("message_status", {
        status: "delivered",
        id: data.senderId,
      });

      console.log(data.conversationId === currentConversationRef.current)
      // Update messages if conversation matches
      if (data.conversationId === currentConversationRef.current) {
        dispatch(addMessage({
          id: data.id,
          sender: data.senderId,
          text: data.content,
          status: data.status,
          recipient: currentLoggedUser || '',
          createdAt: data.createdAt
        }));
      }
    };

    const handleMessageStatus = (data: any) => {
      console.log('socket message_status:', data);
      dispatch(updateMessageStatus({
        id: data._id,
        status: data.status
      }));
    };

    // const handleRecentChatUpdate = (updatedChats: any) => {
    //      console.log("socket recentChatUpdate:", updatedChats);
    //     //  setData(updatedChats);
    // };

    socket.on('connect', handleConnect);
    socket.on('receive_message', handleReceiveMessage);
    socket.on('message_status', handleMessageStatus);
    // socket.on('recentChatUpdate', handleRecentChatUpdate);

    // If already connected, manually trigger registration logic
    if (socket.connected) {
      handleConnect();
    }

    return () => {
      socket.off('connect', handleConnect);
      socket.off('receive_message', handleReceiveMessage);
      socket.off('message_status', handleMessageStatus);
      // socket.off('recentChatUpdate', handleRecentChatUpdate);
    };
  }, [currentConversationId, currentLoggedUser, dispatch]); // Dependencies

  if (recentChats.length === 0 && !userSelectedForChat.id) {
    return <EmptyChatState />;
  }

  return (
    <ChatContainer>
      <ChatWindowHeader />
      <ChatMessages />
      <ChatwindowInput />
    </ChatContainer>
  );
}
