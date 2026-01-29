import styled from "styled-components";
import { useRouter } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authSlice";

export const Customheader = styled.header`
  background: var(--gradient-brand);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 24px;
  box-shadow: var(--shadow-md);
  position: relative;
  
  /* Glassmorphism effect (optional) */
  backdrop-filter: blur(10px);
  
  h2 {
    font-size: 20px;
    font-weight: 600;
    color: white;
    letter-spacing: -0.5px;
  }
`;
export const LogoutButton = styled.button`
  padding: 10px 20px;
  border: 2px solid rgba(255, 255, 255, 0.4);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  backdrop-filter: blur(10px);
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    border-color: rgba(255, 255, 255, 0.6);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.2);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

const Header = () => {
    const { isLoggedIn } = useAppSelector(state => state.auth);
    const dispatch = useAppDispatch();
    const router = useRouter();

    return (
        <Customheader>
            <h2>Friends Chat</h2>
            {isLoggedIn && <LogoutButton onClick={() => {
                sessionStorage.removeItem('token')
                dispatch(logout());
                router.navigate({ to: '/' });
            }}>Logout</LogoutButton>}
        </Customheader>
    )
}

export default Header;