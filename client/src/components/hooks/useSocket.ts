import { useEffect, useRef } from "react";
import socket from "../../socket";
import { setCurrentLoggedUser } from "../../redux/chatSlice";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

const useSocket = () => {
    const dispatch = useAppDispatch();
    const { currentConversationId, currentLoggedUser } = useAppSelector((state) => state.chat);
    const currentConversationRef = useRef(currentConversationId);
    // const { messages} = useAppSelector(state => state.message)

    // Keep ref updated
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
            // socket.emit("message_status", {
            //     status: "delivered",
            //     id: data.senderId, 
            // });

            console.log('check if matches', data.conversationId === currentConversationRef.current)
            // Update messages if conversation matches
            if (data.conversationId === currentConversationRef.current) {
                // let newMessages = []
                // if(messages.some(m => m.id === data._id)) {
                //     newMessages = messages
                // } else {
                //     newMessages = [...messages, {
                //         id: data._id,
                //         sender: data.senderId,
                //         text: data.content,
                //         status: data.status,
                //         recipient: currentLoggedUser || '', 
                //         createdAt: data.createdAt
                //     }]
                // } 
                // dispatch(setMessages(newMessages))
                //  setMessages((prev) => {
                //     // Avoid duplicates
                //     if (prev.some(m => m.id === data._id)) return prev;
                //     return [...prev, {
                //         id: data._id,
                //         sender: data.senderId,
                //         text: data.content,
                //         status: data.status,
                //         recipient: currentLoggedUser || '', 
                //         createdAt: data.createdAt
                //     }];
                //  });
            }
        };

        const handleMessageStatus = () => {
        //     // const newMessages = messages.map(msg => {
        //     //     return msg.id === data._id ? { ...msg, status: data.status } : msg
        //     // })
        //     // dispatch(setMessages(newMessages))
        //     // setMessages((prev) => prev.map(msg => 
        //     //     msg.id === data._id ? { ...msg, status: data.status } : msg
        //     // ));
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

//   return { data }
}

export default useSocket;