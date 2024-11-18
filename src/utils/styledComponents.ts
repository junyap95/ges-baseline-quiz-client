import styled from "styled-components";

export const LinkTag = styled.a`
  text-decoration: none;
  background-color: #fcaf33;
  color: #e5e5e5;
  width: 25em;
  height: 4em;
  /* padding: 0.5em 8em; */
  border: 2px solid #333333;
  border-radius: 2rem;
  box-shadow: 0px 4px 0px 0px #333333;
  display: flex;
  flex-direction: column;
  justify-content: center;

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px 0px 0px #333333;
    transition: none;
  }

  &.unavailable {
    text-decoration-color: red;
    box-shadow: none;
    border: 2px solid rgba(51, 51, 51, 0.5);
    box-shadow: 0px 4px 0px 0px rgba(51, 51, 51, 0.5);
    background-color: transparent;
    pointer-events: none;
  }
`;

export const Header1 = styled.h1`
  margin: 0px;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;
  color: #333333;

  @media (max-width: 1365px) {
    font-size: 1.8rem; /* Change the font size for screens smaller than specified */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Change the font size for screens smaller specified */
  }
`;

export const Header2 = styled.h2`
  margin: 0px;
  font-weight: lighter;
  text-align: center;
  font-size: 1.5rem;
`;

export const CompletionTag = styled.small`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Header2Extended = styled(Header2)`
  font-size: 1rem;
  color: rgba(51, 51, 51, 0.5);
`;
