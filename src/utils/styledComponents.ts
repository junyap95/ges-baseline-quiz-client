import styled from "styled-components";

export const LinkTag = styled.a`
  text-decoration: none;
  background-color: #fff;

  &: hover {
    background-color: #d4e0e8;
  }
`;

export const Header1 = styled.h1`
  margin: 0px;
  font-weight: 600;
  font-size: 2rem;
  text-align: center;

  @media (max-width: 1365px) {
    font-size: 2rem; /* Change the font size for screens smaller than 768px */
  }

  @media (max-width: 480px) {
    font-size: 18px; /* Change the font size for screens smaller than 480px */
  }
`;

export const Header2 = styled.h2`
  margin: 0px;
  font-weight: lighter;
  text-align: center;
  font-size: 1.5rem;
`;
