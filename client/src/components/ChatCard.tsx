import { ListItem } from "./styles/SidebarStyles";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { setRecentChats, setUserSelectedForChat } from "../redux/chatSlice";
import type { Chat } from "./Sidebar";
import styled from "styled-components";
// Removed unused default_pp
import { AvatarContainer, ChatCardContainer, ChatNameText, TimestampContainer } from "./styles/ChatStyles";
import SmartImg from "./SmartImg";

// export const ChatCardContainer = styled.div`
//   display: flex;
//   justify-content: flex-start;
//   align-items: center;
//   gap: 20px;
// `;

export const ChatNameContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`;

// export const CustomImg = styled.img`
//   border-radius: 50%;
//   width: 60px;
//   height: 60px;
// `;

const ChatCard = ({ chat }: { chat: Chat }) => {
  const dispatch = useAppDispatch();
  const { recentChats } = useAppSelector((state) => state.chat)
  const handleChatClick = () => {
    dispatch(
      setUserSelectedForChat({
        id: chat.id || "",
        firstname: chat.firstname || "",
        lastname: chat.lastname || "",
        username: chat.username || "",
        email: chat.email || "",
        photo_url: chat.photo_url
      })
    );
    dispatch(setRecentChats([chat, ...recentChats.filter((c: any) => c.id !== chat.id)]));
  };

  return (
    <ListItem onClick={() => handleChatClick()} key={chat.id}>
      <ChatCardContainer>
        <AvatarContainer>
          <SmartImg src={chat.photo_url} />
        </AvatarContainer>
        <ChatNameContainer>
          <ChatNameText>{`${chat.firstname} ${chat.lastname}`}</ChatNameText>
          <TimestampContainer>{chat.lastMessage}</TimestampContainer>
        </ChatNameContainer>
      </ChatCardContainer>
    </ListItem>
  );
};

export default ChatCard;
