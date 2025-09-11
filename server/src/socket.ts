import { io } from '.';
import { getRecentChats } from './controllers/conversation-controller';
import { messageController } from './controllers/messageController';

const onlineUsers = new Map();

export const socketController = (socket: any) =>{
    console.log("a user connected");
    socket.on("register", (userId: any) => {
        onlineUsers.set(userId.userId, socket.id);
    })

    socket.on("message_status", (data: any) => {
        const { status, id } = data;
        const senderSocketId = onlineUsers.get(id);
        io.to(senderSocketId).emit("message_status",{
            status: status,
            id: id
        })
    });

    socket.on("send_message", async(data: any) => {
        const { senderId, receiverId, content, conversationId } = data;
        const receiverSocketId = onlineUsers.get(receiverId);
        const senderSocketId = onlineUsers.get(senderId);
        const message = await messageController(senderId, receiverId, content, conversationId);
        io.to(senderSocketId).emit("message_status", {
            status: 'sent',
            message: message
        })
        const recentSenderChatData = await getRecentChats(senderId)
        const recentReceiverChatData = await getRecentChats(receiverId)
        io.to(senderSocketId).emit('recentChatUpdate', recentSenderChatData)
        io.to(receiverSocketId).emit('recentChatUpdate', recentReceiverChatData)
        console.log('receiverSocketId', receiverSocketId)
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive_message", {
                id: message?._id.toString(),
                senderId,
                conversationId,
                receiverId,
                content,
                createdAt: message?.createdAt
            });
        }
    });
};