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
import { socketController } from './socket';



const app = express();
const PORT = process.env.PORT || 3000;
const server = createServer(app)
export const io = new Server(server, {
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

io.on("connection",socketController)
