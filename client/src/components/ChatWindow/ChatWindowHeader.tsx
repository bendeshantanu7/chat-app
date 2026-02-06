import { BackButton, ChatHeader } from "../styles/ChatStyles"
import SmartImg from "../SmartImg";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { setCurrentConversationId, setUserSelectedForChat } from "../../redux/chatSlice";
import { IoArrowBack } from "react-icons/io5";

const ChatWindowHeader = () => {
  const { userSelectedForChat } = useAppSelector((state) => state.chat);
  const dispatch = useAppDispatch();

  return (
    <ChatHeader>
      <BackButton onClick={() => {
        dispatch(setCurrentConversationId(null));
        dispatch(setUserSelectedForChat({ id: '' }));
      }}>
        <IoArrowBack size={24} />
      </BackButton>
      <SmartImg src={userSelectedForChat?.photo_url} />
      {userSelectedForChat
        ? `${userSelectedForChat.firstname} ${userSelectedForChat.lastname}`
        : "Select a user to chat"}
    </ChatHeader>
  )
}

export default ChatWindowHeader;