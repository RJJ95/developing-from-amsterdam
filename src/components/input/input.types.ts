export interface InputProps {
  type?: string;
  label?: string;
  value: string;
  onChange: (e: string) => void;
  placeholder: string;
  disabled: boolean;
  id: string;
  onEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  list?: string;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
}
