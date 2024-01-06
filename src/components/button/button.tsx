"use client";

import { FC } from "react";
import styles from "./Button.module.css";
import { ButtonProps } from "./button.types";

const Button: FC<ButtonProps> = ({
  text,
  onClick,
  disabled,
  variant,
  size,
}) => {
  const sizeClass = styles[size ?? "medium"];
  const variantClass = styles[variant ?? "filled"];

  const classNames = `${styles.button} ${sizeClass} ${variantClass} ${
    disabled ? styles.disabled : ""
  }`;

  return (
    <button onClick={onClick} className={classNames} disabled={disabled}>
      {text}
    </button>
  );
};

export default Button;
