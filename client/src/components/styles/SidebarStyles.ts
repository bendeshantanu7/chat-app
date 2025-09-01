import styled from "styled-components"

export const SidebarContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: #f0f0f0;
  border-right: 1px solid #eee;
  height: 100%;
  overflow: hidden;
`

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

export const ListItem = styled.li`
  padding: 12px 16px;
  border-bottom: 1px solid #eee;
  background-color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #f5f5f5;
  }
`