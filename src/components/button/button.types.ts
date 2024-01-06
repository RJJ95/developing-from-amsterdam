export interface ButtonProps {
  variant?: "filled" | "outline" | "ghost";
  size?: "giant" | "large" | "medium" | "small" | "tiny";
  text?: string;
  onClick: () => void;
  disabled?: boolean;
}
