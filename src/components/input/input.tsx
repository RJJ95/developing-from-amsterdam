import { FC } from "react";
import { Wrapper, StyledInput } from "./input.style";
import { InputProps } from "./input.types";

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
    <Wrapper>
      <StyledInput
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
    </Wrapper>
  );
};

export default Input;
