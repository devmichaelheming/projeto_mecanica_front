import React, { FC, ReactElement, ReactNode, useState } from "react";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
  HomeOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/router";
import Header from "./Header";
const { Content, Footer, Sider } = Layout;

interface LayoutProps {
  children: ReactNode;
}

// type MenuItem = Required<MenuProps>["items"][number];

// function getItem(
//   label: React.ReactNode,
//   key: React.Key,
//   icon?: React.ReactNode,
//   children?: MenuItem[]
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//   } as MenuItem;
// }

// const items: MenuItem[] = [
//   getItem("Inicio", "1", <HomeOutlined />),
//   getItem("Cadastros", "2", <UserOutlined />, [
//     getItem("Usuários", "3"),
//     getItem("Clientes", "4"),
//     getItem("Produtos", "5"),
//   ]),
//   getItem("Orçamentos", "6", <HomeOutlined />),
// ];

const App: FC<LayoutProps> = ({ children }): ReactElement => {
  const [collapsed, setCollapsed] = useState(false);
  const router = useRouter();

  const itemsMenu: MenuProps["items"] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Inicio",
      onClick: () => router.push("/"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Cadastros",
      children: [
        {
          key: "3",
          icon: <HomeOutlined />,
          label: "Usuários",
          onClick: () => router.push("/usuarios"),
        },
        {
          key: "4",
          icon: <HomeOutlined />,
          label: "Clientes",
          onClick: () => router.push("/"),
        },
        {
          key: "5",
          icon: <HomeOutlined />,
          label: "Produtos",
          onClick: () => router.push("/"),
        },
      ],
    },
    {
      key: "6",
      icon: <HomeOutlined />,
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
        <Menu
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
