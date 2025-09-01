import express from 'express';
import dotenv from 'dotenv';
dotenv.config();

import userRouter from './routes/users-route';
import cors from 'cors';
import { Server } from 'socket.io';
import { createServer } from 'http';
import authRouter from './routes/auth-routes';
import { run } from './mongo';
import { conversationRouter } from './routes/conversation-route';
import { messageController } from './controllers/messageController';



const app = express();
const PORT = process.env.PORT || 3000;
const server = createServer(app)
const io = new Server(server, {
    cors: {origin: "*"}
})

app.use(express.json());

app.use(cors());

run()

app.use('/users', userRouter);

app.use('/auth', authRouter);

app.use('/conversations', conversationRouter);



server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

const onlineUsers = new Map();

io.on("connection",(socket) =>{
    console.log("a user connected");
    socket.on("register", (userId) => {
        onlineUsers.set(userId.userId, socket.id);
    })

    socket.on("send_message", async(data) => {
        const { senderId, receiverId, content, conversationId } = data;
        const receiverSocketId = onlineUsers.get(receiverId);
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive_message", {
                senderId,
                conversationId,
                receiverId,
                content
            });
        }
        await messageController(senderId, receiverId, content, conversationId);
    });
});
