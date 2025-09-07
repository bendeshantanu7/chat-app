import express from 'express';
import { conversationController, recentChats } from '../controllers/conversation-controller';
import { getConversationMessages } from '../controllers/messageController';

export const conversationRouter = express.Router();

conversationRouter.post('/', conversationController);

conversationRouter.get('/messages/:conversationId', getConversationMessages);

conversationRouter.get('/recentChats/:userId',recentChats)
