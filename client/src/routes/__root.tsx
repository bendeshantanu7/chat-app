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

const MainContent = styled.div<{showsidebar: boolean}>`
  display: grid;
  grid-template-columns: ${props => props.showsidebar ? '300px 1fr' : '1fr'};
  flex: 1;
  overflow: hidden;
`;

const AuthenticatedLayout = () => {
  const { isLoggedIn } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
      const token = sessionStorage.getItem("token");
      if(!!token) dispatch(login());
    }, []);

  return (
      <AppContainer>
        <Header />
        <MainContent showsidebar={isLoggedIn}>
          {isLoggedIn && <Sidebar />}
          <Outlet />
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
