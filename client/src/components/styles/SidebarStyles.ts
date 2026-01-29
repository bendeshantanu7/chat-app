import styled from "styled-components"
import { ChatHeader } from "./ChatStyles"

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background: linear-gradient(180deg, #fafafa 0%, #f5f5f5 100%);
  border-right: 1px solid #e5e5e5;
  height: 100%;
  overflow: hidden;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.04);
`;
export const ChatSidebarHeader = styled(ChatHeader)`
  justify-content: space-between;
  background: white;
  padding: 20px 16px;
  border-bottom: 1px solid #e5e5e5;
  
  span {
    font-size: 18px;
    font-weight: 700;
    color: hsl(0, 0%, 10%);
  }
`;
export const ListItem = styled.li`
  padding: 14px 16px;
  background-color: #fff;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  border-left: 3px solid transparent;
  
  &:hover {
    background: linear-gradient(90deg, rgba(32, 232, 116, 0.08) 0%, rgba(32, 232, 116, 0.02) 100%);
    border-left-color: hsl(145, 80%, 55%);
    transform: translateX(2px);
  }
  
  &:not(:last-child) {
    border-bottom: 1px solid #f0f0f0;
  }
`;

export const UnorderedList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  overflow-y: auto;
  height: 100%;

  /* Custom scrollbar styling */
  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  &::-webkit-scrollbar-thumb {
    background: #ccc;
    border-radius: 3px;
  }
`

// export const ListItem = styled.li`
//   padding: 12px 16px;
//   border-bottom: 1px solid #eee;
//   background-color: #fff;
//   cursor: pointer;

//   &:hover {
//     background-color: #f5f5f5;
//   }
// `

// export const ChatSidebarHeader = styled(ChatHeader)`
//   justify-content: space-between;
// `