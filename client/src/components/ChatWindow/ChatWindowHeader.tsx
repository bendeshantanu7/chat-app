import { ChatHeader } from "../styles/ChatStyles"
import { CustomImg } from "../ChatCard";
import default_pp from "../../assets/default_pp.png";
import { useAppSelector } from "../../redux/hooks";

const ChatWindowHeader = () => {
const { userSelectedForChat } = useAppSelector((state) => state.chat);
    return (
        <ChatHeader>
        <CustomImg src={default_pp} />
        {userSelectedForChat
          ? `${userSelectedForChat.firstname} ${userSelectedForChat.lastname}`
          : "Select a user to chat"}
      </ChatHeader>
    )
}

export default ChatWindowHeader;