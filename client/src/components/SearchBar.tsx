import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDebounce from "./hooks/useDebounce";
import {
  ChatNameContainer,
} from "./ChatCard";
import useFetch from "./hooks/useFetch";
import { ListItem } from "./styles/SidebarStyles";
// Removed unused default_pp
import { setRecentChats, setUserSelectedForChat } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { AvatarContainer, ChatCardContainer, ChatNameText } from "./styles/ChatStyles";
import SmartImg from "./SmartImg";
const Container = styled.div`
  position: relative;
  width: 100%;
  padding: 0 16px;
  margin-bottom: 8px;
`;
const SearchInputWrapper = styled.div`
  position: relative;
  width: 100%;
`;
const SearchIcon = styled.div`
  position: absolute;
  left: 14px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  transition: color 0.2s;
  
  svg {
    width: 18px;
    height: 18px;
  }
`;
const Input = styled.input`
  width: 100%;
  padding: 12px 40px 12px 42px;
  font-size: 15px;
  border: 2px solid var(--border-light);
  border-radius: 24px;
  outline: none;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: var(--bg-primary);
  color: var(--text-primary);
  &:focus {
    border-color: var(--brand-500);
    background: white;
    box-shadow: 0 0 0 4px hsla(145, 63%, 42%, 0.1);
    
    & + ${SearchIcon} {
      color: var(--brand-600);
    }
  }
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;
const ClearButton = styled.button<{ show: boolean }>`
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  background: var(--neutral-200);
  border: none;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  display: ${props => props.show ? 'flex' : 'none'};
  align-items: center;
  justify-content: center;
  cursor: pointer;
  transition: all 0.2s;
  color: var(--text-secondary);
  font-size: 12px;
  
  &:hover {
    background: var(--neutral-300);
    color: var(--text-primary);
  }
`;
const SuggestionList = styled.ul`
  position: absolute;
  top: calc(100% + 8px);
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 8px 0;
  background: var(--bg-primary);
  border: 1px solid var(--border-light);
  border-radius: 12px;
  box-shadow: var(--shadow-xl);
  max-height: 320px;
  overflow-y: auto;
  z-index: 100;
  backdrop-filter: blur(10px);
  animation: slideDown 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  
  @keyframes slideDown {
    from {
      opacity: 0;
      transform: translateY(-8px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  
  /* Custom scrollbar */
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background: var(--neutral-300);
    border-radius: 3px;
  }
`;
const SectionLabel = styled.div`
  padding: 8px 16px 4px;
  font-size: 12px;
  font-weight: 700;
  color: var(--text-tertiary);
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;
const EmptyState = styled.div`
  padding: 32px 20px;
  text-align: center;
  color: var(--text-tertiary);
  font-size: 14px;
`;
const Loader = styled.div`
  position: absolute;
  right: 42px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  border: 2px solid var(--brand-200);
  border-top-color: var(--brand-600);
  border-radius: 50%;
  animation: spin 0.8s linear infinite;
  
  @keyframes spin {
    to {
      transform: translateY(-50%) rotate(360deg);
    }
  }
`;
const SearchBar: React.FC = () => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { get } = useFetch();
  const debouncedQuery = useDebounce(query, 400);
  const dispatch = useAppDispatch();
  const { recentChats } = useAppSelector((state) => state.chat);

  useEffect(() => {
    if (!debouncedQuery.trim()) {
      setSuggestions([]);
      return;
    }
    setIsLoading(true);
    const getUsers = async () => {
      const data = await get("users");
      const filtered = data.filter(
        (user: any) =>
          user.username.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          user.firstname.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          user.lastname.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      console.log('filtered', filtered)
      // Exclude users already in recent chats
      const newUsers = filtered.filter(
        (user: any) => !recentChats.some((chat: any) => chat.id === user.id)
      );
      console.log('newUsers', newUsers)
      setSuggestions(filtered);
      setIsLoading(false);
    };
    getUsers();
  }, [debouncedQuery]);
  const handleSelect = (chat: any) => {
    setQuery("");
    setSuggestions([]);
    dispatch(
      setUserSelectedForChat({
        id: chat.id || "",
        firstname: chat.firstname || "",
        lastname: chat.lastname || "",
        username: chat.username || "",
        email: chat.email || "",
        photo_url: chat.photo_url || "",
      })
    );
    dispatch(
      setRecentChats([
        chat,
        ...recentChats.filter((c: any) => c.id !== chat.id),
      ])
    );
  };
  const showDropdown = query.trim() && (suggestions.length > 0 || !isLoading);
  return (
    <Container>
      <SearchInputWrapper>
        <Input
          type="text"
          value={query}
          placeholder="Search users..."
          onChange={(e) => setQuery(e.target.value)}
        />
        <SearchIcon>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </SearchIcon>
        {isLoading && <Loader />}
        <ClearButton
          show={query.length > 0}
          onClick={() => {
            setQuery("");
            setSuggestions([]);
          }}
        >
          ×
        </ClearButton>
      </SearchInputWrapper>

      {showDropdown && (
        <SuggestionList>
          {/* {filteredChats.length > 0 && ( */}
          <>
            <SectionLabel>Recent Chats</SectionLabel>
            {/* {filteredChats.map((item: any) => (
                <ListItem onClick={() => handleSelect(item)} key={item.id}>
                  <ChatCardContainer>
                    <AvatarContainer>
                      <SmartImg src={item.photo_url} />
                    </AvatarContainer>
                    <ChatNameContainer>
                      <ChatNameText>{`${item.firstname} ${item.lastname}`}</ChatNameText>
                      <span style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>@{item.username}</span>
                    </ChatNameContainer>
                  </ChatCardContainer>
                </ListItem>
              ))} */}
          </>
          {/* )} */}

          {suggestions.length > 0 && (
            <>
              <SectionLabel>New Conversations</SectionLabel>
              {suggestions.map((item: any) => (
                <ListItem onClick={() => handleSelect(item)} key={item.id}>
                  <ChatCardContainer>
                    <AvatarContainer>
                      <SmartImg src={item.photo_url} />
                    </AvatarContainer>
                    <ChatNameContainer>
                      <ChatNameText>{`${item.firstname} ${item.lastname}`}</ChatNameText>
                      <span style={{ color: "var(--text-tertiary)", fontSize: "13px" }}>@{item.username}</span>
                    </ChatNameContainer>
                  </ChatCardContainer>
                </ListItem>
              ))}
            </>
          )}

          {!isLoading && suggestions.length === 0 && (
            <EmptyState>
              <div style={{ fontSize: "32px", marginBottom: "8px" }}>🔍</div>
              <div>No users found</div>
              <div style={{ fontSize: "12px", marginTop: "4px" }}>Try a different search term</div>
            </EmptyState>
          )}
        </SuggestionList>
      )}
    </Container>
  );
};
export default SearchBar;