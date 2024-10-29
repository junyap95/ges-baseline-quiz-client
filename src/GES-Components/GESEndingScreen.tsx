import { useRef, useState } from "react";
import { Header2, Header1 } from "../utils/styledComponents";
import { CSSTransition } from "react-transition-group";
import ConfidenceSlider from "../Components/ConfidenceSlider";
import { QuizStages } from "../utils/constants";
import GESSlider from "./Components/GESSlider";
import { useGesSelector } from "../store/state";
import { selectAllUserAnswers, selectTimeTakenArray } from "../selectors/ges-data-selector";

function timeConverter(millis: number): string {
  if (!millis) return "N/A";
  var minutes = Math.floor(millis / 60000);
  var seconds = ((millis % 60000) / 1000).toFixed(0);
  return minutes + ":" + (Number(seconds) < 10 ? "0" : "") + seconds;
}

const writeIntoSheet = async (sheetData: {}) => {
  const googleSheetUrl = process.env.REACT_APP_GES_TEST;
  if (googleSheetUrl) {
    try {
      const response = await fetch(googleSheetUrl, {
        method: "POST",
        body: JSON.stringify(sheetData),
      });
      if (response.ok) {
        return { message: "Please hand the device back to your facilitator." };
      }
    } catch (error) {
      return { message: "Some error occurred. Please inform your facilitator." };
    }
  } else {
    return { message: "Error: Missing Google Sheet URL. Please inform your facilitator." };
  }
};

// const sendBackupEmail = async (sheetData: {}) => {
//   const awsLambda = process.env.REACT_APP_NODEMAILER;
//   if (awsLambda) {
//     try {
//       const response = await fetch(awsLambda, {
//         method: "POST",
//         body: JSON.stringify(sheetData),
//       });
//       if (response.ok) {
//         console.log("backup email sent");
//       }
//     } catch (error) {
//       console.log("Some error occurred while sending backup email.");
//     }
//   } else {
//     console.log("Error: Missing Lambda URL.");
//   }
// };

export default function GESEndingScreen() {
  const [message, setMessage] = useState<{ [key: string]: string }>({});
  const [recordWritten, setRecordWritten] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentTopic = sessionStorage.getItem("topic");
  const allUserAnswers = useGesSelector(selectAllUserAnswers);
  const { el1, el2, el3, l1, l2 } = useGesSelector(selectTimeTakenArray);
  const nodeRef = useRef(null); // ref for hint object
  const nodeRefHintBubble = useRef(null); // ref for hint bubble

  // TODO some sql data writing
  // Time taken

  const handleFinish = async () => {
    setLoading(true);
    const {
      confidenceGES_START,
      confidenceGES_END,
      userProfile,
      topic,
      hintsUsage,
      howFarLevelGES_START,
      howFarLevelGES_END,
    } = sessionStorage;

    const sheetData = {
      topic: topic,
      userid: JSON.parse(userProfile).userid,
      username: JSON.parse(userProfile).username,
      howFarYouGoLevelStart: howFarLevelGES_START,
      howYouFeelQuizEnd: howFarLevelGES_END || "0",
      confidenceStart: confidenceGES_START,
      confidenceEnd: confidenceGES_END || "0",
      hintsUsed: hintsUsage ? JSON.parse(hintsUsage).join(", ") : "none",
      el1_time: timeConverter(el1) || 0,
      el2_time: timeConverter(el2) || 0,
      el3_time: timeConverter(el3) || 0,
      l1_time: timeConverter(l1) || 0,
      l2_time: timeConverter(l2) || 0,
      ...allUserAnswers,
    };
    console.log("sheetdata", sheetData);
    const res = await writeIntoSheet(sheetData);
    // await sendBackupEmail(sheetData);
    setMessage(res ?? { message: "Unknown error" });
    setRecordWritten(true);
    setLoading(false);
  };

  const handleClearStorage = () => {
    sessionStorage.clear();
    window.location.href = "http://localhost:3000/game-map";
  };

  return (
    <>
      <CSSTransition
        in={!recordWritten}
        timeout={500}
        classNames="slide"
        unmountOnExit
        nodeRef={nodeRefHintBubble}
      >
        <>
          {!loading && (
            <>
              <Header1> 🎉 Well done for completing the quiz! 🎉</Header1>
              <ConfidenceSlider stage={QuizStages.GES_END} />
              <GESSlider stage={QuizStages.GES_END} />
            </>
          )}

          <button
            className="btn-next visible"
            onClick={!loading ? handleFinish : undefined}
            disabled={loading}
          >
            {loading ? "Saving...Please Wait..." : "Finish Test!"}
          </button>
          {loading && (
            <img
              src="/images/sam_anim03.gif"
              className="sam"
              alt="Studyseed Sam"
              style={{ height: "5em" }}
            />
          )}
        </>
      </CSSTransition>

      <CSSTransition
        in={recordWritten}
        timeout={500}
        classNames="slide"
        unmountOnExit
        nodeRef={nodeRef}
      >
        <div
          ref={nodeRef}
          style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5em" }}
        >
          <Header2>🥳The {currentTopic} quiz has ended.🥳</Header2>
          <p>{message.message}</p>
          <button
            className="btn-next visible"
            style={{ padding: "1em", maxWidth: "40vw", textDecoration: "none" }}
            onClick={handleClearStorage}
          >
            Back to Map
          </button>
        </div>
      </CSSTransition>
    </>
  );
}