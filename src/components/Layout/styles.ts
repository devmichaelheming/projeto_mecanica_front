import { Menu as MenuAntd } from "antd";
import styled from "styled-components";

export const Menu = styled(MenuAntd)`
  .ant-menu-title-content {
    padding-left: 8px;
  }

  .ant-submenu {
    padding-left: 24px !important;
  }
`;

export default {
  Menu,
};
