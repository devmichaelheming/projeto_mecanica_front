import { UserOutlined } from "@ant-design/icons";
import { Dropdown, Menu } from "antd";
import React, { FC, ReactElement } from "react";

import S from "./styles";

const HeaderPage: FC = (): ReactElement => {
  const opcoesMenu = [
    { label: "Perfil", href: "/perfil" },
    {
      label: "Configurações",
      href: "/configuracoes",
    },
  ];

  const menuitems = (
    <div>
      <Menu
        style={{
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Menu
          items={[
            { key: "1", title: "Perfil" },
            { key: "2", title: "Configurações" },
          ]}
        />

        <Menu.Item
          key="Sair"
          style={{
            paddingTop: "12px",
            paddingBottom: "12px",
            paddingLeft: "24px",
          }}
        >
          <span
            style={{
              display: "flex",
              alignContent: "center",
              alignItems: "center",
              gap: "12px",
              color: "#e30707",
            }}
          >
            Sair
          </span>
        </Menu.Item>
      </Menu>
    </div>
  );

  return (
    <S.Container>
      <Dropdown overlay={menuitems} trigger={["click"]}>
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
