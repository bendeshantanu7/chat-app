import styled from "styled-components"

export const SendChatButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`

export const ChatInput = styled.input`
  flex: 1;
  border: 1px solid #ccc;
  border-radius: 20px;
  padding: 10px 20px;
  outline: none;

  &:focus {
    border-color: #4caf50;
  }
`

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
  background: #f9f9f9;
  overflow: hidden;
  width: calc(100vw - 300px);
`

export const ChatMessageContainer = styled.div<{ sender: string }>`
  display: flex;
  justify-content: ${props => props.sender === "me" ? "flex-end" : "flex-start"};
  margin-bottom: 10px;
  padding: 15px;
`

export const ChatBubble = styled.div<{ sender: string }>`
  max-width: 60%;
  padding: 10px 15px;
  border-radius: 20px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px;
  background: ${props => props.sender === "me" ? "#4caf50" : "#fff"};
  color: ${props => props.sender === "me" ? "#fff" : "#000"};
`

export const ChatHeader = styled.div`
  padding: 16px;
  background-color: #fff;
  border-bottom: 1px solid #eee;
  font-weight: 600;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  gap: 10px;
`

export const ChatWindowContainer = styled.div`
flex: 1;
overflow-y: auto;
padding: 10px;
margin-bottom: 60px;
`