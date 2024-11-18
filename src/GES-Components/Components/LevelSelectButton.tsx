import { CompletionTag, Header2, Header2Extended, LinkTag } from "../../utils/styledComponents";
import { CircleCheck } from "lucide-react";

type LevelProps = {
  available?: boolean;
  level: number;
  completion?: string;
  handleQuizStart?: (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => void;
};

export function AvailableLevel({ available, level, completion, handleQuizStart }: LevelProps) {
  const actualLevel = level + 1;
  return (
    <LinkTag
      title="Start Quiz Button"
      className={!available ? "unavailable" : ""}
      onClick={available ? handleQuizStart : undefined}
    >
      {available ? (
        <Header2>Start!</Header2>
      ) : (
        <Header2Extended>Level {actualLevel} Not Available</Header2Extended>
      )}
      {completion && (
        <CompletionTag>
          Completed: {completion?.split("T")[0]}
          <CircleCheck color="#e5e5e5" fill="#3380fc" strokeWidth={"1.8px"} />
        </CompletionTag>
      )}
    </LinkTag>
  );
}
