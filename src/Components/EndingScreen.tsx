import { useEffect, useState } from "react";
import { Header2, Header1 } from "../utils/styledComponents";

const writeIntoSheet = async (sheetData: {}) => {
  const googleSheetUrl = process.env.REACT_APP_GOOGLE_SHEET;
  if (googleSheetUrl) {
    try {
      const response = await fetch(googleSheetUrl, {
        method: "POST",
        body: JSON.stringify(sheetData),
      });
      if (response.ok) {
        sessionStorage.clear();
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

export default function EndingScreen({
  userAnswers,
}: {
  userAnswers: {
    [key: string]: string | string[] | { [key: string]: string };
  };
}) {
  const [message, setMessage] = useState<{ [key: string]: string }>({});
  const [recordWritten, setRecordWritten] = useState(false);

  useEffect(() => {
    const writeData = async () => {
      const { confidenceLevel, topic, username, hintsUsage } = sessionStorage;
      const sheetData = {
        topic: topic,
        username: username,
        confidenceLevel: confidenceLevel || "0",
        hintsUsed: hintsUsage ? JSON.parse(hintsUsage).join(", ") : "none",
        ...userAnswers,
      };
      const res = await writeIntoSheet(sheetData);
      await sendBackupEmail(sheetData);
      setMessage(res ?? { message: "Unknown error" });
      setRecordWritten(true);
    };
    writeData();
  }, [userAnswers]);

  return (
    <>
      <Header1> 🎉 Congratulations!! 🎉</Header1>
      <Header2>The quiz has ended.</Header2>
      <Header2>You've taken a great step forward!</Header2>
      <p>{message.message}</p>
      {recordWritten && (
        <a
          href="/"
          className="btn-next visible"
          style={{ padding: "1em", maxWidth: "40vw", textDecoration: "none" }}
        >
          Go Back
        </a>
      )}
    </>
  );
}
