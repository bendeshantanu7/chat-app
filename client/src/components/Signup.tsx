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

const Signup = () => {
  const [formValues, setFormValues] = useState({
    username: "",
    email: "",
    password: "",
  });

  const { post } = useFetch();
  const router = useRouter();

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await post("auth/signup", {
        body: JSON.stringify(formValues),
      });
      sessionStorage.setItem("token", res.token);
      await router.navigate({ to: "/chats" });
    } catch (error) {
      console.error("Error signing up:", error);
    }
  };

  return (
    <SignupContainer>
      <FormContainer>
        <Title>Create Account</Title>
        <StyledForm onSubmit={onSignup}>
          <InputGroup>
            <Input
              type="text"
              placeholder="Username"
              value={formValues.username}
              onChange={(e) =>
                setFormValues({ ...formValues, username: e.target.value })
              }
              required
            />
          </InputGroup>
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
          <SubmitButton type="submit">Sign Up</SubmitButton>
            <Link to="/">Already have an account? Log In</Link>
        </StyledForm>
      </FormContainer>
    </SignupContainer>
  );
};

export default Signup;
