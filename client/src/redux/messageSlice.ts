import { createSlice } from "@reduxjs/toolkit"
import type { Message } from "../components/ChatWindow/Chat"

const messageSlice = createSlice({
    name: 'message',
    initialState: {
        messages: [] as Message[]
    },
    reducers: {
        setMessages: (state, action) => {
            state.messages = action.payload
        },
        addMessage: (state, action) => {
            const newMessage = action.payload;
            if (!state.messages.some(msg => msg.id === newMessage.id)) {
                state.messages.push(newMessage);
            }
        },
        updateMessageStatus: (state, action) => {
            state.messages = state.messages.map(msg => {
                return msg.id === action.payload.id ? { ...msg, status: action.payload.status } : msg
            })
        }
    }
})

export const { setMessages, updateMessageStatus, addMessage } = messageSlice.actions;

export default messageSlice.reducer;