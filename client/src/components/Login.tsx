import { useState } from "react";
import {
  SignupContainer,
  FormContainer,
  Title,
  StyledForm,
  InputGroup,
  Input,
  SubmitButton,
} from "./styles/Signup";
import useFetch from "./hooks/useFetch";
import { Link, useRouter } from "@tanstack/react-router";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/authSlice";

const Login = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const dispatch = useAppDispatch()

  const { post } = useFetch();

  const router = useRouter();

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await post("auth/login", {
        body: JSON.stringify(formValues),
      });
      sessionStorage.setItem("token", res.token);
      dispatch(login());
      await router.navigate({ to: "/chats" });
    } catch (error) {
      console.error("Error logging in:", error);
    }
  };

  return (
    <SignupContainer>
      <FormContainer>
        <Title>Login</Title>
        <StyledForm onSubmit={onLogin}>
          <InputGroup>
            <Input
              type="email"
              placeholder="Email"
              value={formValues.email}
              onChange={(e) =>
                setFormValues({ ...formValues, email: e.target.value })
              }
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="password"
              placeholder="Password"
              value={formValues.password}
              onChange={(e) =>
                setFormValues({ ...formValues, password: e.target.value })
              }
              required
            />
          </InputGroup>
          <SubmitButton type="submit">Log In</SubmitButton>
          <Link to="/signup">Don't have an account? Sign Up</Link>
        </StyledForm>
      </FormContainer>
    </SignupContainer>
  );
};

export default Login;
