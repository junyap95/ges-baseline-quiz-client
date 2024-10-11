import { Header2, Header1 } from "../utils/styledComponents";

export default function EndingScreen() {
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
