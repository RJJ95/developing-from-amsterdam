import styled, { css } from "styled-components";
import { ButtonProps } from "./button.types";

const giantButtonStyles = css`
  padding: 16px;
  font-size: 18px;
  height: 56px;
`;

const largeButtonStyles = css`
  padding: 12px;
  font-size: 16px;
  height: 48px;
`;

const mediumButtonStyles = css`
  padding: 10px;
  font-size: 13px;
  height: 40px;
`;

const smallButtonStyles = css`
  padding: 8px;
  font-size: 12px;
  height: 32px;
`;

const tinyButtonStyles = css`
  padding: 6px;
  font-size: 10px;
  height: 26px;
`;

const filledButtonStyles = css<ButtonProps>`
  background-color: ${({ mode, theme }) =>
    theme.colors[mode ?? "primary"].filled[500]};
  color: ${({ theme }) => theme.colors.basic.filled[100]};

  border: none;

  &:hover {
    background-color: ${({ mode, theme }) =>
      theme.colors[mode ?? "primary"].filled[600]};
  }

  &:focus {
    background-color: ${({ mode, theme }) =>
      theme.colors[mode ?? "primary"].filled[700]};
  }
`;

const outlineButtonStyles = css<ButtonProps>`
  background-color: ${({ mode, theme }) => {
    if (mode === "basic") {
      return "#FFF";
    }

    return theme.colors[mode ? mode : "primary"].transparent[0.08];
  }};

  border: 1px solid
    ${({ mode, theme }) => theme.colors[mode ?? "primary"].filled[500]};
  color: ${({ mode, theme }) => theme.colors[mode ?? "primary"].filled[500]};

  &:hover {
    background-color: ${({ mode, theme }) =>
      theme.colors[mode ?? "primary"].transparent[0.16]};
  }

  &:focus {
    background-color: ${({ mode, theme }) =>
      theme.colors[mode ?? "primary"].transparent[0.32]};
  }
`;

const ghostButtonStyles = css<ButtonProps>`
  background-color: transparent;
  text-transform: capitalize;
  border: none;
  color: ${({ mode, theme }) => theme.colors[mode ?? "primary"].filled[500]};

  &:hover {
    background-color: ${({ theme }) => theme.colors.basic.filled[300]};
  }

  &:focus {
    background-color: ${({ theme }) => theme.colors.basic.filled[400]};
  }
`;

export const BaseButton = styled.button<ButtonProps>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  font-weight: 700;
  text-transform: uppercase;
  cursor: pointer;

  border-radius: ${({ theme }) => theme.borderRadius};

  ${({ size }) => {
    switch (size) {
      case "giant":
        return giantButtonStyles;
      case "large":
        return largeButtonStyles;
      case "medium":
        return mediumButtonStyles;
      case "small":
        return smallButtonStyles;
      case "tiny":
        return tinyButtonStyles;
    }
  }};

  ${({ variant }) => {
    switch (variant) {
      case "filled":
        return filledButtonStyles;
      case "outline":
        return outlineButtonStyles;
      case "ghost":
        return ghostButtonStyles;
    }
  }};

  &:disabled {
    background-color: ${({ theme }) => theme.colors.basic.transparent[0.08]};
    border: 1px solid ${({ theme }) => theme.colors.basic.filled[500]};
    color: ${({ theme }) => theme.colors.basic.filled[500]};
    cursor: no-drop;
  }
`;
