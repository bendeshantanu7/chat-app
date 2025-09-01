import { useEffect, useState } from "react";
import { SidebarContainer, UnorderedList, ListItem } from "./styles/SidebarStyles";
import { ChatHeader } from "./styles/ChatStyles";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setCurrentConversationId, setUserSelectedForChat } from "../redux/chatSlice";
import useFetch from "./hooks/useFetch";

interface Chat {
  id: string
  username: string
  email: string
}

const Sidebar = () => {
  const [chats, setChats] = useState<Chat[]>([])
  const {userSelectedForChat} = useAppSelector(state => state.chat)
  const dispatch = useAppDispatch();
  const token = sessionStorage.getItem("token");
  const currentUser: { id: string } = jwtDecode(token as string);
  const { get, post } = useFetch();
  useEffect(() => {
    const fetchChats = async () => {
      const data = await get("users")
      setChats(data.filter((chat: any) => chat.id !== currentUser?.id))
    }

    fetchChats()
  }, [])

  useEffect(() => {
    dispatch(setUserSelectedForChat({id: chats[0]?.id, username: chats[0]?.username, email: chats[0]?.email}))
  }, [chats])

  useEffect(() => {
    createConversation();
  },[userSelectedForChat])

  const handleChatClick = (chatId: string) => {
    dispatch(setUserSelectedForChat(chats.find(chat => chat.id === chatId) || {id: '', username: '', email: ''}))
  }

  const createConversation = async () => {
    if (!userSelectedForChat.id) return;

    const newConversation = await post("conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${sessionStorage.getItem("token")}`
      },
      body: JSON.stringify({
        sender: currentUser.id,
        recipient: userSelectedForChat?.id
      })
    });
    
    dispatch(setCurrentConversationId(newConversation.chat_id));
  }

  return (
    <SidebarContainer>
      <ChatHeader>Chats</ChatHeader>
      <UnorderedList>
        {chats.map((chat) => (
          <ListItem onClick={() => handleChatClick(chat.id)} key={chat.id}>{chat.username}</ListItem>
        ))}
      </UnorderedList>
    </SidebarContainer>
  )
}

export default Sidebar