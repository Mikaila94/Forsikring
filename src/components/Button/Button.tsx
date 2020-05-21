import React from "react";
import css from "./Button.module.scss";

interface Props {
  title: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  variant?: "black" | "white";
  type?: "button" | "submit";
}

export default function Button({
  title,
  variant = "black",
  onClick,
  type = "button",
}: Props) {
  const classNames = [
    css.button,
    variant === "black" ? css.black : css.white,
  ].join(" ");

  return (
    <button type={type} className={classNames} onClick={onClick}>
      {title}
    </button>
  );
}
