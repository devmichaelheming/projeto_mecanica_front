import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import _ from "lodash";
import React, { FC, ReactElement, ReactNode } from "react";

import S from "./styles";

interface MenuActionsProps {
  items: Array<{
    title: string;
    onClick: () => void;
    icon: ReactNode;
    danger?: boolean;
  }>;
}

const MenuActions: FC<MenuActionsProps> = ({ items }): ReactElement => {
  const handleItemsMenu = () => {
    const dataMenu = items.map((item, key) => {
      return (
        <Menu.Item key={key} onClick={item.onClick}>
          <S.BoxActions danger={item.danger}>
            {item.icon}
            <span>{item.title}</span>
          </S.BoxActions>
        </Menu.Item>
      );
    });

    return <Menu>{dataMenu}</Menu>;
  };

  return (
    <Dropdown overlay={handleItemsMenu} trigger={["click"]}>
      <MenuOutlined />
    </Dropdown>
  );
};

export default MenuActions;
