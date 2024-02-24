import { Layout } from "antd";
import styled from "styled-components";
const { Header } = Layout;

export const Container = styled(Header)`
  padding: 0 20px;
  background: #fff;
  display: flex;
  justify-content: flex-end;
  align-items: center;

  svg {
    font-size: 22px;
    cursor: pointer;
  }
`;

export default {
  Container,
};
