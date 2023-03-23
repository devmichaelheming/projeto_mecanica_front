import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import React, { FC, ReactElement, ReactNode } from "react";
import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import Footer from "./Footer";
import Header from "./Header";
import { Router, useRouter } from "next/router";

const { Content, Sider } = Layout;

interface LayoutPageProps {
  children: ReactNode;
}

// const items2: MenuProps["items"] = [
//   UserOutlined,
//   LaptopOutlined,
//   NotificationOutlined,
// ].map((icon, index) => {
//   const key = String(index + 1);

//   return {
//     key: `sub${key}`,
//     icon: React.createElement(icon),
//     label: `subnav ${key}`,

//     children: new Array(4).fill(null).map((_, j) => {
//       const subKey = index * 4 + j + 1;
//       return {
//         key: subKey,
//         label: `option${subKey}`,
//       };
//     }),
//   };
// });

const LayoutPage: FC<LayoutPageProps> = ({ children }): ReactElement => {
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  const router = useRouter();

  const itemsMenu: MenuProps["items"] = [
    {
      key: "1",
      icon: <HomeOutlined />,
      label: "Home",
      onClick: () => router.push("/"),
    },
    {
      key: "2",
      icon: <UserOutlined />,
      label: "Usuários",
      onClick: () => router.push("/usuarios"),
    },
  ];

  return (
    <Layout>
      <Header />

      <Content style={{ padding: "0 50px" }}>
        <Layout
          style={{
            padding: "24px 0",
            background: colorBgContainer,
            minHeight: "calc(100vh - 131px)",
          }}
        >
          <Sider style={{ background: colorBgContainer }} width={200}>
            <Menu
              mode="inline"
              defaultSelectedKeys={["1"]}
              defaultOpenKeys={["sub1"]}
              style={{ height: "100%" }}
              items={itemsMenu}
            />
          </Sider>
          <Content style={{ padding: "0 24px", minHeight: 280 }}>
            {children}
          </Content>
        </Layout>
      </Content>

      <Footer />
    </Layout>
  );
};

export default LayoutPage;
