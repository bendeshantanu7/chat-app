import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import Sidebar from "../components/Sidebar";
import styled from "styled-components";
import Header from "../components/Header";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useEffect } from "react";
import { login } from "../redux/authSlice";

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

const MainContent = styled.div<{ showsidebar: boolean; $isChatOpen?: boolean }>`
  display: grid;
  grid-template-columns: ${props => props.showsidebar ? '300px 1fr' : '1fr'};
  flex: 1;
  overflow: hidden;

  .sidebar-wrapper, .chat-wrapper {
    height: 100%;
    overflow: hidden;
  }

  @media (max-width: 768px) {
    display: block; // Stack vertically or just show one
    position: relative;
    
    // Hide sidebar when chat is open OR when not logged in
    .sidebar-wrapper {
      display: ${props => (!props.showsidebar || props.$isChatOpen) ? 'none' : 'block'};
    }

    // Hide chat when chat is NOT open AND we are logged in
    .chat-wrapper {
      display: ${props => (props.showsidebar && !props.$isChatOpen) ? 'none' : 'block'};
    }
  }
`;

const AuthenticatedLayout = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const { currentConversationId } = useAppSelector(state => state.chat);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const token = sessionStorage.getItem("token");
    if (!!token) dispatch(login());
  }, []);

  return (
    <AppContainer>
      <Header />
      <MainContent
        showsidebar={isLoggedIn}
        $isChatOpen={!!currentConversationId}
      >
        <div className="sidebar-wrapper">
          {isLoggedIn && <Sidebar />}
        </div>
        <div className="chat-wrapper">
          <Outlet />
        </div>
      </MainContent>
    </AppContainer>
  );
};

export const Route = createRootRoute({
  component: () => {
    return (
      <>
        <AuthenticatedLayout />
        <TanStackRouterDevtools />
      </>
    );
  },
});
