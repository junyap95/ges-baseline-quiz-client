import { Link } from "react-router-dom";
import { Header1 } from "../utils/styledComponents";

export default function QuizSelection() {
  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          <Header1>Select one Topic</Header1>

          <Link to="/quiz?topic=numeracy" className="topicBox btn-next visible">
            <img src="./images/sam_colon.png" alt="Studyseed Sam" className="sam-topic" />
            <span>Numeracy</span>
          </Link>

          <Link to="/quiz?topic=literacy" className="topicBox btn-next visible ">
            <img src="./images/sam_period.png" alt="Studyseed Sam" className="sam-topic" />
            <span>Literacy</span>
          </Link>
        </div>
      </div>
    </>
  );
}
