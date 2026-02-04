import styled from "styled-components";

const EmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  padding: 60px 40px;
  text-align: center;
  background: var(--gradient-subtle);
  animation: fadeIn 0.4s ease-in-out;
  
  @keyframes fadeIn {
    from { 
      opacity: 0; 
      transform: translateY(20px); 
    }
    to { 
      opacity: 1; 
      transform: translateY(0); 
    }
  }
`;

const IconWrapper = styled.div`
  width: 120px;
  height: 120px;
  margin-bottom: 32px;
  background: linear-gradient(135deg, var(--brand-50) 0%, var(--brand-100) 100%);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  animation: pulse 2s ease-in-out infinite;
  
  svg {
    width: 56px;
    height: 56px;
    color: var(--brand-600);
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      box-shadow: 0 0 0 0 hsla(145, 63%, 42%, 0.4);
    }
    50% { 
      transform: scale(1.05);
      box-shadow: 0 0 0 20px hsla(145, 63%, 42%, 0);
    }
  }
`;

const Heading = styled.h2`
  font-size: 28px;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 12px;
  letter-spacing: -0.5px;
`;

const Description = styled.p`
  font-size: 16px;
  color: var(--text-secondary);
  margin-bottom: 8px;
  max-width: 400px;
  line-height: 1.6;
`;

const Hint = styled.p`
  font-size: 14px;
  color: var(--text-tertiary);
  display: flex;
  align-items: center;
  gap: 8px;
  margin-top: 24px;
  padding: 12px 20px;
  background: white;
  border-radius: 24px;
  border: 2px solid var(--border-light);
  
  svg {
    width: 18px;
    height: 18px;
    color: var(--brand-600);
  }
`;

const EmptyChatState = () => {
  return (
    <EmptyStateContainer>
      <IconWrapper>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
      </IconWrapper>
      
      <Heading>No conversations yet</Heading>
      <Description>
        Start chatting by searching for users in the sidebar
      </Description>
      
      <Hint>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        Use the search bar above to find someone
      </Hint>
    </EmptyStateContainer>
  );
};

export default EmptyChatState;
