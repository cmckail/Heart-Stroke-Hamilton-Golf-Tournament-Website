import { Button } from "@material-ui/core";
import React, { useEffect } from "react";
import { useState } from "react";

interface IProps {
  loadText?: string;
  onClick: (e: React.MouseEvent) => void;
  disabled: boolean;
  children: React.ReactNode;
}
export default function SubmitButton({
  onClick,
  disabled,
  children,
  loadText = "Loading...",
}: IProps) {
  const [isDisabled, setDisabled] = useState(disabled);
  const [buttonText, setText] = useState(children as string);
  const handleClick = (e: React.MouseEvent) => {
    setDisabled(true);
    setText(loadText);

    onClick(e);
  };
  useEffect(() => setDisabled(disabled), [disabled]);
  return (
    <Button
      disabled={isDisabled}
      variant="contained"
      color="secondary"
      onClick={handleClick}
    >
      {buttonText}
    </Button>
  );
}
