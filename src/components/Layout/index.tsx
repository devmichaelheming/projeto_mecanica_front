import React, { FC, ReactElement, ReactNode, useState } from "react";
import { UserOutlined, HomeOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useRouter } from "next/router";
import Header from "./Header";
import Image from "next/image";
const { Content, Footer, Sider } = Layout;
import {
  budgetIcon,
  homeIcon,
  menuIcon,
  registrationsIcon,
} from "~/assets/icons";

import S from "./styles";

interface LayoutProps {
  children: ReactNode;
}

const App: FC<LayoutProps> = ({ children }): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const itemsMenu: MenuProps["items"] = [
    {
      key: "1",
      icon: <Image src={homeIcon} />,
      label: "Inicio",
      onClick: () => router.push("/"),
    },
    {
      key: "2",
      icon: <Image src={registrationsIcon} />,
      label: "Cadastros",
      children: [
        {
          key: "3",
          label: "Usuários",
          onClick: () => router.push("/usuarios"),
          className: "ant-submenu",
        },
        {
          key: "4",
          label: "Clientes",
          onClick: () => router.push("/"),
          className: "ant-submenu",
        },
        {
          key: "5",
          label: "Produtos",
          onClick: () => router.push("/"),
          className: "ant-submenu",
        },
      ],
    },
    {
      key: "6",
      icon: <Image src={budgetIcon} />,
      label: "Orçamentos",
      onClick: () => router.push("/"),
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sider
        collapsible
        collapsed={collapsed}
        onCollapse={(value) => setCollapsed(value)}
      >
        <div className="demo-logo-vertical" />
        <S.Menu
          theme="dark"
          defaultSelectedKeys={["1"]}
          mode="inline"
          items={itemsMenu}
        />
      </Sider>
      <Layout>
        <Header />
        <Content style={{ margin: "0 16px" }}>{children}</Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©{new Date().getFullYear()} Created by Ant UED
        </Footer>
      </Layout>
    </Layout>
  );
};

export default App;
