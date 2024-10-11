import { useEffect } from "react";
import { Header2, Header1 } from "../utils/styledComponents";
import { GOOGLE_SHEET } from "../utils/constants";

export default function EndingScreen({
  userAnswers,
}: {
  userAnswers: {
    [key: string]: string | string[] | { [key: string]: string };
  };
}) {
  useEffect(() => {
    console.log("userAnswer", userAnswers);
    const { confidenceLevel, topic, username, hintsUsage } = sessionStorage;
    console.log(confidenceLevel, topic, username, hintsUsage as string[]);

    const sheetData = {
      topic: topic,
      username: username,
      confidenceLevel: confidenceLevel || "0",
      hintsUsed: hintsUsage ? JSON.parse(hintsUsage).join(", ") : "none",
      ...userAnswers,
    };
    console.log("sheetData", sheetData);

    fetch(GOOGLE_SHEET, {
      method: "POST",
      body: JSON.stringify(sheetData),
    });
  }, [userAnswers]);

  return (
    <>
      <Header1> 🎉 Congratulations!! 🎉</Header1>
      <Header2>The quiz has ended.</Header2>
      <Header2>Please hand the device back to your facilitator.</Header2>
      <a
        href="/"
        className="btn-next visible"
        style={{ padding: "1em", maxWidth: "40vw", textDecoration: "none" }}
      >
        Go Back
      </a>
    </>
  );
}
