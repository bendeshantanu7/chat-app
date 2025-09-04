import { useState } from "react";
import {
  SignupContainer,
  FormContainer,
  Title,
  StyledForm,
  InputGroup,
  Input,
  SubmitButton,
  NameContainer,
} from "./styles/Signup";
import useFetch from "./hooks/useFetch";
import { Link, useRouter } from "@tanstack/react-router";
import { useAppDispatch } from "../redux/hooks";
import { login } from "../redux/authSlice";

const Signup = () => {
  const [formValues, setFormValues] = useState({
    firstname: "",
    lastname: "",
    username: "",
    email: "",
    password: "",
  });

  const { post } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await post("auth/signup", {
        body: JSON.stringify(formValues),
      });
      sessionStorage.setItem("token", res.token);
      dispatch(login());
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
          <NameContainer>
            <InputGroup>
            <Input
              type="text"
              placeholder="First name"
              value={formValues.firstname}
              onChange={(e) =>
                setFormValues({ ...formValues, firstname: e.target.value })
              }
              required
            />
          </InputGroup>
          <InputGroup>
            <Input
              type="text"
              placeholder="Last name"
              value={formValues.lastname}
              onChange={(e) =>
                setFormValues({ ...formValues, lastname: e.target.value })
              }
              required
            />
          </InputGroup>
          </NameContainer>
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
          <div style={{ marginTop: "12px", textAlign: "center" }}>
            <Link to="/">Already have an account? Log In</Link>
          </div>
        </StyledForm>
      </FormContainer>
    </SignupContainer>
  );
};

export default Signup;
