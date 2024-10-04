import { useCallback, useState } from "react";
import StudySeedLogo from "../images/Studyseed Logo - Transparent BG.png";
import Sam from "../images/Seed Small transparent.png";
import SamSemiColon from "../images/sam_semicolon.png";
import SamQuotes from "../images/sam_quotes.png";
import IntroAutoType from "./IntroAutoType";
import { Header1, Header2 } from "../utils/styledComponents";

export default function Introduction() {
  // State to track the current step
  const [step, setStep] = useState(1);
  // State to store user input
  const [name, setName] = useState("");
  const [btnVisible, setBtnVisible] = useState(false);
  const [error, setError] = useState(false);

  const btnVisibility = useCallback(() => {
    setBtnVisible(true);
  }, []);

  // Function to move to the next step
  const nextStep = () => {
    setBtnVisible(false);
    if (step === 2 && !name) {
      setError(true);
    } else {
      setStep((prevStep) => prevStep + 1);
    }
  };
  // Function to handle input change
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "name") {
      setName(value);
      setError(false);
    }
    btnVisibility();
  };

  // Conditionally render based on the current step
  return (
    <div className="quiz-intro">
      {step === 1 && (
        <>
          <img src={Sam} className="sam" alt="Studyseed Sam" />
          <div className="intro-msg">
            <Header1>Welcome to</Header1>
            <Header1>
              <img src={StudySeedLogo} className="logo-inline" alt="Studyseed Logo" />
            </Header1>
            <Header1>Gamified Baseline Assessment!</Header1>
            <IntroAutoType fn={btnVisibility} />

            <button className={`btn-next ${btnVisible ? "visible" : ""}`} onClick={nextStep}>
              LET'S GO
            </button>
          </div>
        </>
      )}
      {step === 2 && (
        <>
          <img src={SamQuotes} className="sam" alt="Studyseed Sam" />

          <div className="intro-msg">
            <Header1>First, what should we call you?</Header1>
            <input
              className="intro-input-text"
              type="text"
              name="name"
              value={name}
              onChange={handleInputChange}
              placeholder="Your name"
              required={true}
            />
            {error && <Header2>Please enter your name!</Header2>}
            <button className={`btn-next ${btnVisible ? "visible" : ""}`} onClick={nextStep}>
              NEXT STEP
            </button>
          </div>
        </>
      )}
      {step === 3 && (
        <>
          <img src={SamSemiColon} className="sam" alt="Studyseed Sam" />
          <div className="intro-msg">
            <Header1>
              {name}, are you ready to take on the test? Let's go ahead and choose a topic!
            </Header1>
            <Header2>It is going to be fun!</Header2>

            <a href="/quiz-selection" className="btn-next visible">
              I AM READY
            </a>
          </div>
        </>
      )}
    </div>
  );
}
