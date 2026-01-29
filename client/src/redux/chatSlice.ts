import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        userSelectedForChat: {id: '', firstname: '', lastname: '', email: ''},
        currentLoggedUser: null,
        currentConversationId: null,
        recentChats: []
    },
    reducers: {
        setUserSelectedForChat: (state, action) => {
            state.userSelectedForChat = action.payload;
        },
        setCurrentLoggedUser: (state, action) => {
            state.currentLoggedUser = action.payload;
        },
        setCurrentConversationId: (state, action) => {
            state.currentConversationId = action.payload;
        },
        setRecentChats: (state, action) => {
            state.recentChats = action.payload
        }
    }
})

export const { setUserSelectedForChat, setCurrentLoggedUser, setCurrentConversationId, setRecentChats } = chatSlice.actions;

export default chatSlice.reducer;