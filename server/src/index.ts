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

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

app.use(cors());

run()

app.get("/", (req, res) => {
  res.send("✅ Chat backend is live!");
});

app.get("/debug/online-users", (req, res) => {
  const { onlineUsers, logBuffer } = require("./socket");
  res.json({
      onlineUsers: Array.from(onlineUsers.entries()),
      logs: logBuffer
  });
});

app.use('/users', userRouter);

app.use('/auth', authRouter);

app.use('/conversations', conversationRouter);

server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

io.on("connection",socketController)
