import React, { useEffect, useState } from "react";
import styled from "styled-components";
import useDebounce from "./hooks/useDebounce";
import {
  // ChatCardContainer,
  ChatNameContainer,
  // CustomImg,
} from "./ChatCard";
import useFetch from "./hooks/useFetch";
import { ListItem } from "./styles/SidebarStyles";
import default_pp from "../assets/default_pp.png";
import { setRecentChats, setUserSelectedForChat } from "../redux/chatSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { ChatCardContainer, CustomImg } from "./styles/ChatStyles";

const Container = styled.div`
  position: relative;
  width: 320px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s ease;

  &:focus {
    border-color: #007bff;
  }
`;

const SuggestionList = styled.ul`
  position: absolute;
  top: 105%;
  left: 0;
  right: 0;
  list-style: none;
  margin: 0;
  padding: 0;
  background: #fff;
  border: 1px solid #ddd;
  border-top: none;
  border-radius: 6px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.05);
  max-height: 200px;
  overflow-y: auto;
  z-index: 10;
`;

const Loader = styled.span`
  position: absolute;
  right: 10px;
  top: 10px;
  font-size: 14px;
  color: #888;
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
      console.log("Fetching users for query:", debouncedQuery);
      const data = await get("users");
      console.log("data", data);
      const filtered = data.filter(
        (user: any) =>
          user.username.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          user.firstname.toLowerCase().includes(debouncedQuery.toLowerCase()) ||
          user.lastname.toLowerCase().includes(debouncedQuery.toLowerCase())
      );
      console.log("filtered", filtered);
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
      })
    );
    dispatch(
      setRecentChats([
        chat,
        ...recentChats.filter((c: any) => c.id !== chat.id),
      ])
    );
  };

  return (
    <Container>
      <Input
        type="text"
        value={query}
        placeholder="Search users..."
        onChange={(e) => setQuery(e.target.value)}
      />
      {isLoading && <Loader>⏳</Loader>}
      {suggestions.length > 0 && (
        <SuggestionList>
          {suggestions.map((item: any) => (
            <ListItem onClick={() => handleSelect(item)} key={item.id}>
              <ChatCardContainer>
                <div>
                  <CustomImg src={default_pp} alt="Avatar" />
                </div>
                <ChatNameContainer>
                  <strong>{`${item.firstname} ${item.lastname}`}</strong>
                  <span style={{ color: "gray" }}>{item.lastMessage}</span>
                </ChatNameContainer>
              </ChatCardContainer>
            </ListItem>
          ))}
        </SuggestionList>
      )}
    </Container>
  );
};

export default SearchBar;
