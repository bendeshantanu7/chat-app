import { useEffect, useState } from "react";
import {
  ChatSidebarHeader,
  SidebarContainer,
  UnorderedList,
} from "./styles/SidebarStyles";
import { jwtDecode } from "jwt-decode";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import {
  setCurrentConversationId,
  setRecentChats,
  setUserSelectedForChat,
} from "../redux/chatSlice";
import useFetch from "./hooks/useFetch";
import ChatCard from "./ChatCard";
import SearchBar from "./SearchBar";
import useSocket from "./hooks/useSocket";

export interface Chat {
  id: string;
  firstname: string;
  lastname: string;
  username: string;
  email: string;
  lastMessage?: string;
}

const Sidebar = () => {
  const [chats, setChats] = useState<Chat[]>([]);
  const { userSelectedForChat, recentChats } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();
  const token = sessionStorage.getItem("token");
  const currentUser: { id: string } = jwtDecode(token as string);
  const { get, post } = useFetch();
  const {data} = useSocket()

  useEffect(() => {
    const fetchChats = async () => {
      const data = await get(`conversations/recentChats/${currentUser?.id}`);
      const recentChats = data.map((chat: any) => {
        return {
          id: chat.id,
          firstname: chat.first_name,
          lastname: chat.last_name,
          username: chat.username,
          email: chat.email,
          lastMessage: chat.lastMessage
        }
      }).filter((chat: any) => chat.id !== currentUser.id);
      setChats(recentChats);
      dispatch(setRecentChats(recentChats));
    };

    fetchChats();
  }, []);

  useEffect(() => {

    const recentChats = data.map((chat: any) => {
        return {
          id: chat.id,
          firstname: chat.first_name,
          lastname: chat.last_name,
          username: chat.username,
          email: chat.email,
          lastMessage: chat.lastMessage
        }
      }).filter((chat: any) => chat.id !== currentUser.id)
    setChats(recentChats);
    dispatch(setRecentChats(recentChats))


  },[data])

  useEffect(() => {
    dispatch(
      setUserSelectedForChat({
        id: chats[0]?.id,
        firstname: chats[0]?.firstname,
        lastname: chats[0]?.lastname,
        username: chats[0]?.username,
        email: chats[0]?.email,
      })
    );
  }, [chats]);

  useEffect(() => {
    if(userSelectedForChat.id) {
      createConversation();
    }
  }, [userSelectedForChat.id]);

  const createConversation = async () => {
    if (!userSelectedForChat.id) return;

    const newConversation = await post("conversations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${sessionStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        sender: currentUser.id,
        recipient: userSelectedForChat?.id,
      }),
    });

    dispatch(setCurrentConversationId(newConversation.chat_id));
  };

  return (
    <SidebarContainer>
      <ChatSidebarHeader>
        <span>Chats</span>
      </ChatSidebarHeader>
      <SearchBar />
      <UnorderedList>
        {recentChats.map((chat: any) => {
          return <ChatCard key={chat.id} chat={chat} />
        })}
      </UnorderedList>
    </SidebarContainer>
  );
};

export default Sidebar;
