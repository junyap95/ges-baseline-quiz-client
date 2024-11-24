import styled from "styled-components";

export const Options = styled.div`
  display: flex;
  gap: 1em;
  font-size: clamp(0.8em, 1vw, 1em);
`;

export const AnswerEl = styled.div<{
  $width: number;
  $height: number;
  $isPlaced?: boolean;
  $isLoading: boolean;
}>`
  width: ${(props) => props.$width}px;
  background-color: ${(props) => (props.$isPlaced ? "#f58439" : "transparent")};
  border: solid #333333 2px;
  border-radius: 2rem;
  padding: 0.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  opacity: ${(props) => (props.$isLoading ? 0 : "100%")};

  transition: opacity 800ms ease-in;
  user-select: none;
  touch-action: none;
  pointer-events: auto;
  cursor: grab;
  min-width: fit-content;
  min-height: 3.5em;
  max-width: calc(75svw / 4.5);
  max-height: ${(props) => props.$height}px;
`;

export const OptionEl = styled(AnswerEl)`
  opacity: ${(props) => (props.$isLoading ? 0 : "100%")};
  background-color: #f5f5f5;
`;
