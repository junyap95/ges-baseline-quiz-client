import styled from "styled-components";

interface ConfirmButtonProps {
  onClickHandler: () => void; // A function with no parameters that returns void
  proceedCondition?: boolean; // A boolean value
}

export default function ConfirmButton({ onClickHandler, proceedCondition }: ConfirmButtonProps) {
  return (
    <ConfirmBtn
      $proceedCondition={proceedCondition}
      onClick={onClickHandler}
      // className={$proceedCondition ? `submit ${proceedCondition && "proceed"}` : "submit"}
    >
      Confirm
    </ConfirmBtn>
  );
}

export const ConfirmBtn = styled.button<{ $proceedCondition?: boolean }>`
  /* max-width: 50rem; */
  padding: 1em 4em;
  background-color: ${(props) => (props.$proceedCondition ? "#3380fc" : "grey")};
  font-size: 1em;
  border: 2px solid #333333;
  color: ${(props) => (props.$proceedCondition ? "#f5f5f5" : "#e5e5e5")};
  border-radius: 2rem;
  box-shadow: 0px 6px 0px 0px #333333;
  font-weight: bolder;
  text-align: center;
  transform: translateY(20px);
  position: relative;
  overflow: hidden;
  z-index: 1;
  cursor: pointer;
  transform: translateY(0);

  transition: transform 0.01s ease-in, opacity 0.5s ease-in;

  /* &.proceed {
    background-color: #3380fc;
  } */

  &:active {
    transform: translateY(2px);
    box-shadow: 0px 3px 0px 0px #333333;
    transition: none;
  }

  @media (max-height: 500px) {
    padding: 0.8em 4em;
  }
`;
