import { Link } from "@tanstack/react-router";
import styled from "styled-components";

export const SignupContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background: var(--bg-secondary);  /* Pure subtle background */
  padding: 20px;
`;
export const FormContainer = styled.div`
  background: var(--bg-primary);
  backdrop-filter: blur(10px);
  border: 1px solid var(--border-light);
  border-radius: 16px;
  box-shadow: var(--shadow-xl);
  padding: 40px;
  width: 100%;
  max-width: 440px;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.15);
  }
`;
export const Title = styled.h2`
  text-align: center;
  background: var(--gradient-brand);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  margin-bottom: 32px;
  font-size: 32px;
  font-weight: 800;
  letter-spacing: -1px;
`;
export const Input = styled.input`
  width: 100%;
  padding: 14px 16px;
  border: 2px solid var(--border-light);
  border-radius: 10px;
  font-size: 15px;
  color: var(--text-primary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  background: var(--bg-primary);
  
  &:focus {
    border-color: var(--brand-500);
    background: white;
    box-shadow: 0 0 0 4px hsla(145, 63%, 42%, 0.1);
    transform: translateY(-1px);
  }
  
  &::placeholder {
    color: var(--text-tertiary);
  }
`;
export const SubmitButton = styled.button`
  width: 100%;
  padding: 14px;
  background: var(--gradient-brand);
  color: white;
  border: none;
  border-radius: 10px;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px hsla(145, 63%, 42%, 0.3);
  letter-spacing: 0.3px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 20px hsla(145, 63%, 42%, 0.4);
  }
  
  &:active {
    transform: translateY(0);
  }
`;
export const StyledLink = styled(Link)`
  color: var(--brand-600);
  text-decoration: none;
  font-weight: 600;
  transition: all 0.2s;
  position: relative;
  
  &:after {
    content: '';
    position: absolute;
    width: 0;
    height: 2px;
    bottom: -2px;
    left: 0;
    background: var(--brand-600);
    transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  }
  
  &:hover {
    color: var(--brand-700);
    
    &:after {
      width: 100%;
    }
  }
`;


//   display: flex;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   background: linear-gradient(135deg, 
//     hsl(145, 80%, 96%) 0%, 
//     hsl(170, 75%, 96%) 50%,
//     hsl(145, 80%, 96%) 100%);
//   padding: 20px;
// `;
// export const FormContainer = styled.div`
//   background: rgba(255, 255, 255, 0.95);
//   backdrop-filter: blur(10px);
//   border: 1px solid rgba(255, 255, 255, 0.5);
//   border-radius: 16px;
//   box-shadow: 
//     0 10px 40px rgba(0, 0, 0, 0.08),
//     0 2px 8px rgba(0, 0, 0, 0.04);
//   padding: 40px;
//   width: 100%;
//   max-width: 440px;
//   transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 
//       0 20px 60px rgba(0, 0, 0, 0.12),
//       0 4px 12px rgba(0, 0, 0, 0.06);
//   }
// `;
// export const Title = styled.h2`
//   text-align: center;
//   background: linear-gradient(135deg, hsl(145, 80%, 45%) 0%, hsl(170, 75%, 40%) 100%);
//   -webkit-background-clip: text;
//   -webkit-text-fill-color: transparent;
//   background-clip: text;
//   margin-bottom: 32px;
//   font-size: 28px;
//   font-weight: 700;
//   letter-spacing: -0.5px;
// `;
// export const Input = styled.input`
//   width: 100%;
//   padding: 14px 16px;
//   border: 2px solid #e5e7eb;
//   border-radius: 10px;
//   font-size: 15px;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   outline: none;
//   background: #f9fafb;
  
//   &:focus {
//     border-color: hsl(145, 80%, 55%);
//     background: white;
//     box-shadow: 0 0 0 4px rgba(32, 232, 116, 0.1);
//     transform: translateY(-1px);
//   }
  
//   &::placeholder {
//     color: #9ca3af;
//   }
// `;
// export const SubmitButton = styled.button`
//   width: 100%;
//   padding: 14px;
//   background: linear-gradient(135deg, hsl(145, 80%, 55%) 0%, hsl(145, 75%, 50%) 100%);
//   color: white;
//   border: none;
//   border-radius: 10px;
//   font-size: 16px;
//   font-weight: 700;
//   cursor: pointer;
//   transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   box-shadow: 0 4px 12px rgba(32, 232, 116, 0.3);
//   letter-spacing: 0.3px;
  
//   &:hover {
//     transform: translateY(-2px);
//     box-shadow: 0 6px 16px rgba(32, 232, 116, 0.4);
//   }
  
//   &:active {
//     transform: translateY(0);
//   }
// `;
// // Better link styling
// export const StyledLink = styled(Link)`
//   color: hsl(145, 80%, 45%);
//   text-decoration: none;
//   font-weight: 600;
//   transition: all 0.2s;
//   position: relative;
  
//   &:after {
//     content: '';
//     position: absolute;
//     width: 0;
//     height: 2px;
//     bottom: -2px;
//     left: 0;
//     background: hsl(145, 80%, 45%);
//     transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1);
//   }
  
//   &:hover {
//     color: hsl(145, 80%, 40%);
    
//     &:after {
//       width: 100%;
//     }
//   }
// `;

// export const SignupContainer = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   height: 100vh;
//   background: linear-gradient(to right, #20E874 0%, transparent 100%);
// `;

// export const FormContainer = styled.div`
//   background: #fff;
//   border: 1px solid #fff;
//   border-radius: 5px;
//   box-shadow: 2px 3px rgb(0, 0, 0, 0.5);
//   padding: 20px 40px;
// `;

// export const Title = styled.h2`
//   text-align: center;
//   color: #333;
//   margin-bottom: 30px;
//   font-size: 24px;
//   font-weight: 600;
// `;

export const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const InputGroup = styled.div`
  position: relative;
  width: 100%;
`;

// export const Input = styled.input`
//   width: 100%;
//   padding: 12px 16px;
//   border: 2px solid #e1e1e1;
//   border-radius: 8px;
//   font-size: 16px;
//   transition: all 0.3s ease;
//   outline: none;

//   &:focus {
//     border-color: #20E874;
//     box-shadow: 0 0 0 2px rgba(32, 232, 116, 0.1);
//   }

//   &::placeholder {
//     color: #999;
//   }
// `;

// export const SubmitButton = styled.button`
//   width: 100%;
//   padding: 12px;
//   background: #20E874;
//   color: white;
//   border: none;
//   border-radius: 8px;
//   font-size: 16px;
//   font-weight: 600;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover {
//     background: #1bc964;
//   }

//   &:active {
//     transform: scale(0.98);
//   }
// `;

export const NameContainer = styled.div`
  display: flex;
  justify-content: space-between;
  gap: 20px;
`;

export const FileInputLabel = styled.label`
  width: 100%;
  padding: 14px 16px;
  border: 2px dashed var(--border-light);
  border-radius: 10px;
  font-size: 15px;
  color: var(--text-secondary);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  cursor: pointer;
  background: var(--bg-primary);
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  
  &:hover {
    border-color: var(--brand-500);
    background: var(--bg-secondary);
    color: var(--brand-600);
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
`;

export const ErrorMessage = styled.p`
  color: #ff4d4f;
  background: rgba(255, 77, 79, 0.1);
  padding: 10px;
  border-radius: 8px;
  text-align: center;
  font-size: 14px;
  font-weight: 500;
  margin-bottom: 20px;
  border: 1px solid rgba(255, 77, 79, 0.2);
  display: flex;
  align-items: center;
  justify-content: center;
  animation: slideIn 0.3s cubic-bezier(0.4, 0, 0.2, 1);

  @keyframes slideIn {
    from {
      transform: translateY(-10px);
      opacity: 0;
    }
    to {
      transform: translateY(0);
      opacity: 1;
    }
  }
`;
