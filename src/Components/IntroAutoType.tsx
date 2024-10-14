import React from "react";
import { TypeAnimation } from "react-type-animation";

interface ExampleComponentProps {
  fn: () => void;
}

const IntroAutoType: React.FC<ExampleComponentProps> = ({ fn }) => {
  return (
    <TypeAnimation
      sequence={[
        1000,
        "My name is SAM, I am your learning companion.",
        500, // Waits 1s
        "My name is SAM, I am your learning companion. Before we start, let's get to know you!", // Types full sentence
        1000,
        () => {
          fn(); // Executes the callback function
        },
      ]}
      wrapper="h2"
      className="sc-gtLWhw cfMAra"
      speed={70}
      cursor={false}
      style={{
        margin: "0",
        fontWeight: "lighter",
        textAlign: "center",
        fontSize: "1.5rem",
      }}
    />
  );
};

export default IntroAutoType;
