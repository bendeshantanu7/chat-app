import styled from "styled-components";
import { useRouter } from "@tanstack/react-router";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { logout } from "../redux/authSlice";

export const Customheader = styled.header`
    background: #4caf50;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 10px;
`

export const LogoutButton = styled.button`
    padding: 10px 20px;
    border: none;
    border-radius: 5px;

    &:hover {
        text-decoration: underline;
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