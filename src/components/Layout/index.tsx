import {
  HomeOutlined,
  UserOutlined,
  ShoppingCartOutlined,
} from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Layout, Menu } from "antd";
import { useRouter } from "next/dist/client/router";
import React, { FC, ReactElement, ReactNode } from "react";

import Footer from "./Footer";
import Header from "./Header";
import S from "./styles";
const { Content, Sider } = Layout;

interface LayoutPageProps {
  children: ReactNode;
}

const LayoutPage: FC<LayoutPageProps> = ({ children }): ReactElement => {
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
    {
      key: "3",
      icon: <ShoppingCartOutlined />,
      label: "Produtos",
      onClick: () => router.push("/produtos"),
    },
  ];

  return (
    <Layout>
      <Header />

      <Content style={{ padding: "0 50px" }}>
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
