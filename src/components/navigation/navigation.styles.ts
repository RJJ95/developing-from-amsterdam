import styled from "styled-components";

export const Nav = styled.nav`
  background-color: ${({ theme }) => theme.colors.basic.filled[100]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.basic.filled[400]};
  padding: 30px 35px;
  display: flex;
  justify-content: space-between;
  align-items: c;
`;
