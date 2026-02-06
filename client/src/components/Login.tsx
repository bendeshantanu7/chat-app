import { useState } from "react";
import {
  SignupContainer,
  FormContainer,
  Title,
  StyledForm,
  InputGroup,
  Input,
  SubmitButton,
  ErrorMessage,
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
  const [errorMessage, setErrorMessage] = useState("");
  const dispatch = useAppDispatch()

  const { post } = useFetch();

  const router = useRouter();

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const onLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidEmail(formValues.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }
    try {
      const res = await post("auth/login", {
        body: JSON.stringify(formValues),
      });
      sessionStorage.setItem("token", res.token);
      dispatch(login());
      await router.navigate({ to: "/chats" });
    } catch (error: any) {
      console.log(error)
      if (error.status === 401) {
        setErrorMessage("Invalid email or password");
      } else {
        setErrorMessage("Something went wrong. Please try again.");
      }
    }
  };

  return (
    <SignupContainer>
      <FormContainer>
        <Title>Login</Title>
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledForm onSubmit={onLogin} noValidate>
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
