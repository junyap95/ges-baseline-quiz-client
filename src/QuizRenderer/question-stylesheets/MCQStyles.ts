import styled from "styled-components";

export const MCQOptionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  gap: 1.5rem;
`;

export const MCQButton = styled.button`
  min-width: 5rem;
  box-sizing: border-box;
  padding: 1em;
  background-color: #fcaf33;
  font-size: 1em;
  font-weight: 400;
  border: 2px solid #333333;
  color: #333333;
  border-radius: 2rem;
  box-shadow: 0px 8px 0px 0px #333333;
  text-align: center;
  transform: translateY(20px);
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  transform: translateY(0);

  transition: transform 0.01s ease-in, opacity 0.5s ease-in;

  &.active {
    transform: translateY(2px);
    box-shadow: 0px 3px 0px 0px #333333;
    transition: none;
    background-color: rgba(51, 128, 252, 0.5);
    /* color: #e5e5e5; */
    /* font-weight: 600; */
  }

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px 0px 0px #333333;
    transition: none;
  }

  @media (max-height: 500px) {
    padding: 0.8em 1em;
  }
`;
