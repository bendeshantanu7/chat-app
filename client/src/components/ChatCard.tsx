import { ListItem } from "./styles/SidebarStyles";
import { useAppDispatch } from "../redux/hooks";
import { setUserSelectedForChat } from "../redux/chatSlice";
import type { Chat } from "./Sidebar";
import styled from "styled-components";
import default_pp from '../assets/default_pp.png'

export const ChatCardContainer =styled.div`
    display:flex;
    justify-content: flex-start;
    align-items: center;
    gap: 20px;
`

export const ChatNameContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
`

export const CustomImg = styled.img`
    border-radius: 50%;
    width: 60px;
    height: 60px;
`

const ChatCard = ({chat}: {chat: Chat}) => {
    const dispatch = useAppDispatch()
    

  const handleChatClick = () => {
    dispatch(
      setUserSelectedForChat(
        {
          id: chat.id || "",
            firstname: chat.firstname || "",
            lastname: chat.lastname || "",
          username: chat.username || "",
          email: chat.email || "",
        }
      )
    );
  };

  return (
    <ListItem onClick={() => handleChatClick()} key={chat.id}>
        <ChatCardContainer>
            <div>
                <CustomImg src={default_pp} alt="Avatar" />
            </div>
            <ChatNameContainer>
                <strong>{`${chat.firstname} ${chat.lastname}`}</strong>
                <span style={{ color: "gray" }}>{chat.lastMessage}</span>
            </ChatNameContainer>
        </ChatCardContainer>
    </ListItem>
  );
};

export default ChatCard;
