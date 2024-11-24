import styled from "styled-components";

export const MatchingOption = styled.div`
  max-width: 25rem;
  font-size: clamp(0.8em, 1vw, 1em);
  display: flex;
  flex-direction: column;
`;

export const MatchingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 0 0rem;
  gap: 1em;
`;

export const ClearButton = styled.button<{ $proceedCondition?: boolean }>`
  background-color: ${(props) => (props.$proceedCondition ? "#3380fc" : "grey")};
  padding: 1em 4em;
  font-size: 1em;
  border: 2px solid #333333;
  color: #e5e5e5;
  border-radius: 2rem;
  box-shadow: 0px 4px 0px 0px #333333;
  font-weight: bolder;
  text-align: center;
  transform: translateY(20px);
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  transform: translateY(0);
  transition: transform 0.01s ease-in, opacity 0.5s ease-in;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px 0px 0px #333333;
    transition: none;
  }

  @media (max-height: 500px) {
    font-size: 0.8em;
    padding: 0.8em 4em;
  }
`;
