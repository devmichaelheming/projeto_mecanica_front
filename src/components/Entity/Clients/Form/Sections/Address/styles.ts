import styled from "styled-components";

export const ButtonCep = styled.button`
  height: 32px;
  border-radius: 4px;
  padding: 0 10px;
  border: 1px solid #cacaca;
  margin-left: -4px;
  cursor: pointer;
  background: #e9e9e9;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background: #f1f1f1;
  }
`;

export default {
  ButtonCep,
};
