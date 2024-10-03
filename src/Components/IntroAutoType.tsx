import React from "react";
import { TypeAnimation } from "react-type-animation";

interface ExampleComponentProps {
  fn: () => void;
}

const IntroAutoType: React.FC<ExampleComponentProps> = ({ fn }) => {
  return (
    <TypeAnimation
      sequence={[
        "My name is SAM, I am your learning companion.", // Types 'One'
        1000, // Waits 1s
        "My name is SAM, I am your learning companion. Before we start, Let's get to know you first!", // Types full sentence
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
        padding: "0 2em",
      }}
    />
  );
};

export default IntroAutoType;
