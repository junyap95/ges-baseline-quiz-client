import SamColon from "../images/sam_colon.png";
import SamPeriod from "../images/sam_period.png";
import styled from "styled-components";

export default function QuizSelection() {
  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          <h1>Select From One Of The Topics</h1>

          <LinkTag href="/numeracy-quiz" className="topicBox btn-next visible">
            <div className="topicBox">
              <img src={SamColon} alt="Studyseed Sam" className="sam-topic" />
              <span>Numeracy</span>
            </div>
          </LinkTag>

          <LinkTag href="/literacy-quiz" className="topicBox btn-next visible ">
            <div className="topicBox">
              <img src={SamPeriod} alt="Studyseed Sam" className="sam-topic" />
              <span>Literacy</span>
            </div>
          </LinkTag>
        </div>
      </div>
    </>
  );
}

const LinkTag = styled.a`
  text-decoration: none;
  background-color: #fff;

  &: hover {
    background-color: #d4e0e8;
  }
`;
