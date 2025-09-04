import { io } from '.';
import { messageController } from './controllers/messageController';

const onlineUsers = new Map();

export const socketController = (socket: any) =>{
    console.log("a user connected");
    socket.on("register", (userId: any) => {
        onlineUsers.set(userId.userId, socket.id);
    })

    socket.on("message_status", (data: any) => {
        const { status, id } = data;
        console.log('Message status:', status, 'Message ID:', id);
        const senderSocketId = onlineUsers.get(id);
        io.to(senderSocketId).emit("message_status",{
            status: status,
            id: id
        })
    });

    socket.on("send_message", async(data: any) => {
        console.log('data', data)
        const { senderId, receiverId, content, conversationId } = data;
        const receiverSocketId = onlineUsers.get(receiverId);
        const senderSocketId = onlineUsers.get(senderId);
        const message = await messageController(senderId, receiverId, content, conversationId);
        console.log('senderSocketId', senderSocketId)
        io.to(senderSocketId).emit("message_status", {
            status: 'sent',
            message: message
        })
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive_message", {
                id: message._id,
                senderId,
                conversationId,
                receiverId,
                content
            });
        }
    });
};