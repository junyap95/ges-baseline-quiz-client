import SamColon from "../images/sam_colon.png";
import SamPeriod from "../images/sam_period.png";
import { Link } from "react-router-dom";
import { Header1 } from "../utils/styledComponents";

export default function QuizSelection() {
  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          <Header1>Select one Topic</Header1>

          <Link to="/quiz?topic=numeracy" className="topicBox btn-next visible">
            <div className="topicBox">
              <img src={SamColon} alt="Studyseed Sam" className="sam-topic" />
              <span>Numeracy</span>
            </div>
          </Link>

          <Link to="/quiz?topic=literacy" className="topicBox btn-next visible ">
            <div className="topicBox">
              <img src={SamPeriod} alt="Studyseed Sam" className="sam-topic" />
              <span>Literacy</span>
            </div>
          </Link>
        </div>
      </div>
    </>
  );
}
