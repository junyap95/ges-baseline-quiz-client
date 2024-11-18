import { Link } from "react-router-dom";
import { Header1 } from "../utils/styledComponents";

export default function QuizSelection() {
  return (
    <>
      <div className="quiz-intro">
        <div className="intro-msg">
          <Header1>Select one Topic</Header1>

          <Link to="/quiz?topic=numeracy" className="topicBox btn-next visible">
            <img
              src="https://ik.imagekit.io/jbyap95/sam_colon.png?updatedAt=1731335761188"
              alt="Studyseed Sam"
              className="sam-topic"
            />
            <span>Numeracy</span>
          </Link>

          <Link to="/quiz?topic=literacy" className="topicBox btn-next visible ">
            <img
              src="https://ik.imagekit.io/jbyap95/sam_period.png?updatedAt=1729092923546"
              alt="Studyseed Sam"
              className="sam-topic"
            />
            <span>Literacy</span>
          </Link>
        </div>
      </div>
    </>
  );
}
