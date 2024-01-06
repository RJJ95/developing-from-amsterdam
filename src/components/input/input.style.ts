import styled from "styled-components";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  flex: 1;
`;

export const StyledInput = styled.input`
  border: 1px solid ${({ theme }) => theme.colors.basic.filled[400]};
  border-radius: 4px;
  padding: 10px 16px;
  outline: none;
  height: 40px;

  ::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #8f9bb3;
    opacity: 1; /* Firefox */
  }

  ::-webkit-datetime-edit {
    color: #8f9bb3;
  }

  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #8f9bb3;
  }

  ::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #8f9bb3;
  }

  :disabled {
    background-color: ${({ theme }) => theme.colors.basic.filled[200]};
    border-color: ${({ theme }) => theme.colors.basic.filled[400]};
    color: ${({ theme }) => theme.colors.basic.filled[500]};
  }

  :hover {
    border-color: ${({ theme }) => theme.colors.basic.filled[500]};
  }

  :focus {
    border-color: ${({ theme }) => theme.colors.basic.filled[600]};
  }
`;
