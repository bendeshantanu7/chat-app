import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: 'chat',
    initialState: {
        userSelectedForChat: {id: '', username: '', email: ''},
        currentLoggedUser: null,
        currentConversationId: null
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
        }
    }
})

export const { setUserSelectedForChat, setCurrentLoggedUser, setCurrentConversationId } = chatSlice.actions;

export default chatSlice.reducer;