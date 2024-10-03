import React, { useState } from "react";

export default function Introduction() {
  // State to track the current step
  const [step, setStep] = useState(1);
  // State to store user input
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  // Function to move to the next step
  const nextStep = () => {
    setStep(step + 1);
  };

  // Function to handle input change
  const handleInputChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;
    if (name === "name") setName(value);
    if (name === "email") setEmail(value);
  };

  // Conditionally render based on the current step
  return (
    <div className="quiz-app">
      {step === 1 && (
        <div>
          <h1>Welcome to the Quiz!</h1>
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 2 && (
        <div>
          <h2>Enter your name:</h2>
          <input
            type="text"
            name="name"
            value={name}
            onChange={handleInputChange}
            placeholder="Your name"
          />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 3 && (
        <div>
          <h2>Enter your email:</h2>
          <input
            type="email"
            name="email"
            value={email}
            onChange={handleInputChange}
            placeholder="Your email"
          />
          <button onClick={nextStep}>Next</button>
        </div>
      )}
      {step === 4 && (
        <div>
          <h2>Thank you for providing your details!</h2>
          <p>Name: {name}</p>
          <p>Email: {email}</p>
          <p>The quiz will begin soon.</p>
        </div>
      )}
    </div>
  );
}
