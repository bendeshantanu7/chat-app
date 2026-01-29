import styled from "styled-components"

export const ChatInput = styled.input`
  flex: 1;
  border: 2px solid #e5e5e5;
  border-radius: 24px;
  padding: 12px 20px;
  outline: none;
  font-size: 15px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: #f8f9fa;
  
  &:focus {
    border-color: hsl(145, 80%, 55%);
    background: white;
    box-shadow: 0 0 0 4px rgba(32, 232, 116, 0.1);
  }
  
  &::placeholder {
    color: #94a3b8;
  }
`;
export const SendChatButton = styled.button`
  background: linear-gradient(135deg, hsl(145, 80%, 55%) 0%, hsl(145, 75%, 50%) 100%);
  color: white;
  border: none;
  border-radius: 50%;
  width: 44px;
  height: 44px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 2px 8px rgba(32, 232, 116, 0.3);
  
  &:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(32, 232, 116, 0.4);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  /* Add an icon inside */
  svg {
    width: 20px;
    height: 20px;
  }
`;

export const ChatInputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  position: absolute;
  bottom: 0;
  width: -webkit-fill-available;
  padding: 10px;
  box-shadow: 5px 5px 10px rgb(0, 0, 0, 0.5);
  background: #fff;
`

export const ChatContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background: linear-gradient(180deg, #fafafa 0%, #ffffff 100%);
  overflow: hidden;
  width: calc(100vw - 300px);
  position: relative;
`;

export const ChatMessageContainer = styled.div<{ sender: string }>`
  display: flex;
  justify-content: ${props => props.sender === "me" ? "flex-end" : "flex-start"};
  margin-bottom: 10px;
  padding: 15px;
`

export const ChatBubble = styled.div<{ sender: string }>`
  max-width: 60%;
  padding: 12px 16px;
  border-radius: ${props => props.sender === "me" ? "18px 18px 4px 18px" : "18px 18px 18px 4px"};
  box-shadow: var(--shadow-md);
  margin-bottom: 8px;
  background: ${props => props.sender === "me" 
    ? "var(--gradient-brand)"
    : "var(--bg-primary)"};
  color: ${props => props.sender === "me" ? "white" : "var(--text-primary)"};
  border: ${props => props.sender === "me" ? "none" : "1px solid var(--border-light)"};
  display: flex;
  flex-direction: column;
  gap: 4px;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes slideIn {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

export const ChatHeader = styled.div`
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  // justify-content: space-between;
  gap: 10px;
`

export const ChatWindowContainer = styled.div`
flex: 1;
overflow-y: auto;
padding: 10px;
margin-bottom: 60px;
`

export const TimestampContainer = styled.div`
display: flex;
align-items: flex-end;
font-size: 10px`

export const ChatCardContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  gap: 16px;
  position: relative;
`;
export const AvatarContainer = styled.div`
  position: relative;
  flex-shrink: 0;
`;
export const CustomImg = styled.img`
  border-radius: 50%;
  width: 52px;
  height: 52px;
  object-fit: cover;
  border: 2px solid #e5e5e5;
`;
export const OnlineIndicator = styled.div<{ isOnline: boolean }>`
  position: absolute;
  bottom: 2px;
  right: 2px;
  width: 12px;
  height: 12px;
  background: ${props => props.isOnline ? '#4ade80' : '#94a3b8'};
  border: 2px solid white;
  border-radius: 50%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
export const UnreadBadge = styled.div`
  min-width: 20px;
  height: 20px;
  background: hsl(145, 80%, 55%);
  color: white;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: 700;
  padding: 0 6px;
  margin-left: auto;
`;
export const LastMessageText = styled.span`
  color: #64748b;
  font-size: 14px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  max-width: 180px;
`;
export const ChatNameText = styled.strong`
  font-size: 15px;
  font-weight: 600;
  color: #0f172a;
`;