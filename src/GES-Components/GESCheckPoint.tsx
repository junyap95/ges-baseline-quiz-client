import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { startCase } from "lodash";
import { setIsCheckPoint } from "../redux-data-slice/gesAnswersDataSlice";
import { Header1, Header2 } from "../utils/styledComponents";
import styled from "styled-components";

export default function GESCheckPoint({ currentLevel }: { currentLevel: string }) {
  const dispatch = useDispatch();

  const handleCheckPoint = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.currentTarget.value === "YES"
        ? dispatch(setIsCheckPoint({ isCheckPoint: false, isQuizTerminated: false }))
        : dispatch(setIsCheckPoint({ isCheckPoint: true, isQuizTerminated: true }));
    },
    [dispatch]
  );

  // can we have a useEffect here to update progress to DB?
  // IF a user can see the checkpoint, they have completed the level, so we can update the progress here
  // an example update payload is progress = [date, null, null]
  // what do we need? score for this level, date, level index

  const level = startCase(currentLevel); /** lodash formatting */

  return (
    <CheckPointMsg>
      <Header1>🎉 Well Done! 🎉</Header1>
      <Header2>🌟You’ve just completed the current level!🌟</Header2>
      <Header2>
        Do you want to go to <u>{level}</u> ?
      </Header2>
      <CheckPointButton onClickHandler={handleCheckPoint} yesOrNo={true} />
      <CheckPointButton onClickHandler={handleCheckPoint} yesOrNo={false} />
    </CheckPointMsg>
  );
}

interface CheckPointButtonProps {
  onClickHandler: (event: React.MouseEvent<HTMLButtonElement>) => void; // A function with no parameters that returns void
  yesOrNo?: boolean; // A boolean value
}

function CheckPointButton({ onClickHandler, yesOrNo }: CheckPointButtonProps) {
  return (
    <button
      onClick={onClickHandler}
      className={`submit proceed ${yesOrNo ? "cp-green" : "cp-red"}`}
      value={yesOrNo ? "YES" : "NO"}
    >
      {yesOrNo ? "YES, bring it on!" : "NO, I'm good."}
    </button>
  );
}

const CheckPointMsg = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2em;
`;
