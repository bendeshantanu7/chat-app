import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background: linear-gradient(to right, #20E874 0%, transparent 100%);
`;

export const FormContainer = styled.div`
  background: #fff;
  border: 1px solid #fff;
  border-radius: 5px;
  box-shadow: 2px 3px rgb(0, 0, 0, 0.5);
  padding: 20px 40px;
`;

export const Title = styled.h2`
  text-align: center;
  color: #333;
  margin-bottom: 30px;
  font-size: 24px;
  font-weight: 600;
`;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

export const Input = styled.input`
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e1e1e1;
  border-radius: 8px;
  font-size: 16px;
  transition: all 0.3s ease;
  outline: none;

  &:focus {
    border-color: #20E874;
    box-shadow: 0 0 0 2px rgba(32, 232, 116, 0.1);
  }

  &::placeholder {
    color: #999;
  }
`;

export const SubmitButton = styled.button`
  width: 100%;
  padding: 12px;
  background: #20E874;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover {
    background: #1bc964;
  }

  &:active {
    transform: scale(0.98);
  }
`;

export const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;
