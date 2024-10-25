import { useRef, useState } from "react";
import { Header2, Header1 } from "../utils/styledComponents";
import { CSSTransition } from "react-transition-group";
import ConfidenceSlider from "../Components/ConfidenceSlider";
import { QuizStages } from "../utils/constants";
import GESSlider from "./Components/GESSlider";

const writeIntoSheet = async (sheetData: {}) => {
  const googleSheetUrl = process.env.REACT_APP_GES_GOOGLE_SHEET;
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

const sendBackupEmail = async (sheetData: {}) => {
  const awsLambda = process.env.REACT_APP_NODEMAILER;
  if (awsLambda) {
    try {
      const response = await fetch(awsLambda, {
        method: "POST",
        body: JSON.stringify(sheetData),
      });
      if (response.ok) {
        console.log("backup email sent");
      }
    } catch (error) {
      console.log("Some error occurred while sending backup email.");
    }
  } else {
    console.log("Error: Missing Lambda URL.");
  }
};

export default function GESEndingScreen({
  userAnswers,
}: {
  userAnswers: {
    [key: string]: string | string[] | { [key: string]: string };
  };
}) {
  const [message, setMessage] = useState<{ [key: string]: string }>({});
  const [recordWritten, setRecordWritten] = useState(false);
  const [loading, setLoading] = useState(false);
  const currentTopic = sessionStorage.getItem("topic");

  const nodeRef = useRef(null); // ref for hint object
  const nodeRefHintBubble = useRef(null); // ref for hint bubble

  // TODO some sql data writing
  // Time taken

  const handleFinish = async () => {
    setLoading(true);
    const {
      confidenceGES_START,
      confidenceGES_END,
      topic,
      username,
      userid,
      hintsUsage,
      howFarLevelGES_START,
      howFarLevelGES_END,
    } = sessionStorage;

    const { userProfile } = localStorage;
    const sheetData = {
      topic: topic,
      userid: userid,
      username: username,
      howFarYouGoLevelStart: howFarLevelGES_START || "0",
      howYouFeelQuizEnd: howFarLevelGES_END || "0",
      confidenceStart: confidenceGES_START,
      confidenceEnd: confidenceGES_END,
      hintsUsed: hintsUsage ? JSON.parse(hintsUsage).join(", ") : "none",
      ...userAnswers,
    };
    const res = await writeIntoSheet(sheetData);
    await sendBackupEmail(sheetData);
    setMessage(res ?? { message: "Unknown error" });
    setRecordWritten(true);
    setLoading(false);
  };

  const handleClearStorage = () => {
    sessionStorage.clear();
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
          <Header1> 🎉 Congratulations! You're done! 🎉</Header1>
          <ConfidenceSlider stage={QuizStages.GES_END} />
          <GESSlider stage={QuizStages.GES_END} />
          <button className="btn-next visible" onClick={handleFinish}>
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
          <a
            href="/"
            className="btn-next visible"
            style={{ padding: "1em", maxWidth: "40vw", textDecoration: "none" }}
            onClick={handleClearStorage}
          >
            Back to Map
          </a>
        </div>
      </CSSTransition>
    </>
  );
}
