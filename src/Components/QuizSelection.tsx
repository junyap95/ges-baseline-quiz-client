import SamColon from "../images/sam_colon.png";
import SamPeriod from "../images/sam_period.png";
import { LinkTag } from "../utils/styledComponents";
import { Link } from "react-router-dom";

export default function QuizSelection() {
  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          <h1>Select From One Of The Topics</h1>

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
