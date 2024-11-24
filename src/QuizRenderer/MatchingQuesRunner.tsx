import { ArcherContainer, ArcherElement } from "react-archer";
import { MatchType } from "../utils/allQuizQuestions";
import { useMemo } from "react";
import { MatchingOption, MatchingWrapper } from "./question-stylesheets/MatchingStyles";
import { MCQButton } from "./question-stylesheets/MCQStyles";

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
    () => [...question.answers].sort((a, b) => 0.5 - Math.random()),
    [question.answers]
  );

  return (
    <MatchingWrapper>
      <ArcherContainer
        style={{ width: "100%", padding: "0 0em" }}
        strokeColor="#333333"
        endMarker={false}
      >
        <div
          style={{
            width: "100%",
            height: "inherit",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // minWidth: "65dvw",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "1em",
            }}
          >
            {question.options.map((e, index) => (
              <MatchingOption onClick={handleSelectOpt} id={e} key={`opt-${index}`}>
                <ArcherElement
                  id={e}
                  relations={
                    connections[e]
                      ? [
                          {
                            targetId: connections[e],
                            targetAnchor: "left",
                            sourceAnchor: "right",
                            style: { strokeDasharray: "5" },
                          },
                        ]
                      : []
                  }
                >
                  <MCQButton>{e}</MCQButton>
                </ArcherElement>
              </MatchingOption>
            ))}
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1em" }}>
            {shuffledAnswers.map((e, index) => (
              <MatchingOption onClick={handleSelectAns} id={`${e}-${index}`} key={`ans-${index}`}>
                <ArcherElement
                  key={`ans-${index}`}
                  id={`${e}-${index}`}
                  relations={[
                    {
                      targetId: "none",
                      targetAnchor: "left",
                      sourceAnchor: "right",
                      style: { strokeColor: "blue", strokeWidth: 1 },
                      label: <div style={{ marginTop: "-20px" }}>Arrow {index}</div>,
                    },
                  ]}
                >
                  <MCQButton>{e}</MCQButton>
                </ArcherElement>
              </MatchingOption>
            ))}
          </div>
        </div>
      </ArcherContainer>
    </MatchingWrapper>
  );
}
