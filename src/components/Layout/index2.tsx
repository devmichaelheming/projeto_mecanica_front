import { HomeOutlined, UserOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu, theme } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { FC, ReactElement, ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import S from "./styles";
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

      <Content style={{ padding: "0 24px" }}>
        <S.Layout>
          <Sider width={200}>
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
        </S.Layout>
      </Content>

      <Footer />
    </Layout>
  );
};

export default LayoutPage;
