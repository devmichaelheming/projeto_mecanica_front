import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu, MenuProps } from "antd";
import React, { FC, ReactElement } from "react";

import S from "./styles";

const HeaderPage: FC = (): ReactElement => {
  const items: MenuProps["items"] = [
    {
      label: "Perfil",
      key: "1",
    },
    {
      label: "Configurações",
      key: "2",
    },
  ];

  return (
    <S.Container>
      <Dropdown menu={{ items }} trigger={["click"]}>
        <S.Wrapper>
          <S.CircleProfile>
            <UserOutlined />
          </S.CircleProfile>
        </S.Wrapper>
      </Dropdown>
    </S.Container>
  );
};

export default HeaderPage;
