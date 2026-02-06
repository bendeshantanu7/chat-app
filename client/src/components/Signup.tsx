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
  FileInputLabel,
  ErrorMessage,
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
  const [photo, setPhoto] = useState<File | null>(null);
  const [errorMessage, setErrorMessage] = useState("");

  const { post } = useFetch();
  const router = useRouter();
  const dispatch = useAppDispatch();

  const onSignup = async (e: React.FormEvent) => {
    e.preventDefault();

    const isValidEmail = (email: string) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isValidEmail(formValues.email)) {
      setErrorMessage("Please enter a valid email address");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("firstname", formValues.firstname);
      formData.append("lastname", formValues.lastname);
      formData.append("username", formValues.username);
      formData.append("email", formValues.email);
      formData.append("password", formValues.password);
      if (photo) {
        formData.append("photo", photo);
      }

      const res = await post("auth/signup", {
        body: formData,
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
        {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        <StyledForm onSubmit={onSignup} noValidate>
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
          <InputGroup>
            <FileInputLabel>
              {photo ? photo.name : "📷 Upload Photo"}
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                style={{ display: "none" }}
              />
            </FileInputLabel>
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
