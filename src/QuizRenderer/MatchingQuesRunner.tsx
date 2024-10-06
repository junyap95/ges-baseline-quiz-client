import { ArcherContainer, ArcherElement } from "react-archer";
import { MatchType } from "../utils/allQuizQuestions";
import { useMemo } from "react";
const boxStyle = { padding: "10px", border: "1px solid black" };

interface MatchingQuesRunnerProps {
  question: MatchType;
  connections: { [key: string]: string };
  handleSelectOpt: (e: any) => void;
  handleSelectAns: (e: any) => void;
}

export default function MatchingQuesRunner({
  question,
  connections,
  handleSelectOpt,
  handleSelectAns,
}: MatchingQuesRunnerProps) {
  const shuffledAnswers = useMemo(
    () => question.answers.sort((a, b) => 0.5 - Math.random()),
    [question.answers]
  );
  return (
    <>
      <div style={{ width: "inherit", margin: "50px" }}>
        <ArcherContainer strokeColor="#000">
          <div
            style={{
              height: "inherit",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
              {question.options.map((e, index) => (
                <div onClick={handleSelectOpt} id={e}>
                  <ArcherElement
                    id={e}
                    relations={
                      connections[e]
                        ? [
                            {
                              targetId: connections[e],
                              targetAnchor: "left",
                              sourceAnchor: "right",
                              style: { strokeDasharray: "5,5" },
                            },
                          ]
                        : []
                    }
                  >
                    <div style={boxStyle} className="btn-next visible">
                      {e}
                    </div>
                  </ArcherElement>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
              {shuffledAnswers.map((e, index) => (
                <div onClick={handleSelectAns} id={e}>
                  <ArcherElement
                    id={e}
                    relations={[
                      {
                        targetId: "none",
                        targetAnchor: "left",
                        sourceAnchor: "right",
                        style: { strokeColor: "blue", strokeWidth: 1 },
                        label: <div style={{ marginTop: "-20px" }}>Arrow 2</div>,
                      },
                    ]}
                  >
                    <div style={boxStyle} className="btn-next visible">
                      {e}
                    </div>
                  </ArcherElement>
                </div>
              ))}
            </div>
          </div>
        </ArcherContainer>
      </div>
    </>
  );
}
