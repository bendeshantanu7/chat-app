import { useEffect, useRef, useState } from "react";
import socket from "../../socket";
import { setCurrentLoggedUser } from "../../redux/chatSlice";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import type { Message } from "../ChatWindow/Chat";

const useSocket = () => {
    const dispatch = useAppDispatch();
    const [messages, setMessages] = useState<Message[]>([]);
    const { currentConversationId, currentLoggedUser } = useAppSelector((state) => state.chat);
    const currentConversationRef = useRef(currentConversationId);

    const [data, setData] = useState([])
    useEffect(() => {
        socket.connect()

        socket.on('recentChatUpdate',(data) => {
            console.log(data)
            setData(data)
        })

        return () => {
            socket.off("receive_message");
            socket.disconnect();
        };

    },[])

    useEffect(() => {
    currentConversationRef.current = currentConversationId;
  }, [currentConversationId]);

    useEffect(() => {
    socket.connect();
    console.log("Socket connected:"); // Check if socket is connected
    const token = sessionStorage.getItem("token");
    const currentUser: { id: string } = jwtDecode(token as string);
    dispatch(setCurrentLoggedUser(currentUser.id))
    socket.emit("register", { userId: currentUser.id });

    socket.on("receive_message", (data) => {
      console.log('data', data)
      socket.emit("message_status", {
        status: "delivered",
        id: data.senderId,
      });
      if (data.conversationId === currentConversationRef.current) {
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            id: data._id,
            sender: data.senderId,
            text: data.content,
            status: data.status,
            recipient: currentLoggedUser || '',
            createdAt: data.createdAt
          },
        ]);
      }
    });

    socket.on("message_status", (data) => {
      setMessages((prevMessages) => {
        return prevMessages.map((msg) => {
          if (msg.id === data._id) {
            return { ...msg, status: data.status };
          }
          return msg;
        });
      });
    });
    return () => {
      socket.off("receive_message");
      socket.disconnect();
    };
  }, []);

  return { data, messages, setMessages }
}

export default useSocket;