interface ConfirmButtonProps {
  onClickHandler: () => void; // A function with no parameters that returns void
  proceedCondition?: boolean; // A boolean value
}

export default function ConfirmButton({ onClickHandler, proceedCondition }: ConfirmButtonProps) {
  return (
    <button
      onClick={onClickHandler}
      className={proceedCondition ? `submit ${proceedCondition && "proceed"}` : "submit"}
    >
      Confirm
    </button>
  );
}
