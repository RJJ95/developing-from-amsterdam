import { FC } from "react";
import { InputProps } from "./input.types";
import styles from "./input.module.css";

const Input: FC<InputProps> = ({
  value,
  onChange,
  disabled,
  placeholder,
  id,
  onEnter,
  list,
  onFocus,
  onBlur,
  type,
}) => {
  return (
    <input
      className={`${styles.input} ${styles.search}`}
      id={id}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      disabled={disabled}
      placeholder={placeholder}
      onKeyDown={onEnter}
      list={list}
      onFocus={onFocus}
      onBlur={onBlur}
      type={type}
    />
  );
};

export default Input;
