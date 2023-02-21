import { Layout, Menu } from "antd";
import type { MenuProps } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import { useRouter } from "next/router";

const { Header } = Layout;

interface HeaderPageProps {
  items?: MenuProps[];
}

const HeaderPage: FC<HeaderPageProps> = ({ items }): ReactElement => {
  const router = useRouter();
  const [selectedKeys, setSelectedKeys] = useState(["1"]);

  useEffect(() => {
    if (router.pathname) {
      console.log("router.pathname", router.pathname);

      if (router.pathname === "/") {
        setSelectedKeys(["1"]);
      }
      if (router.pathname === "/usuarios") {
        setSelectedKeys(["2"]);
      }
    }
  }, []);

  return (
    <Header className="header">
      <div className="logo" />
      <Menu
        theme="dark"
        mode="horizontal"
        selectedKeys={selectedKeys}
        // defaultSelectedKeys={selectedKeys}
      >
        LOGO AQUI
      </Menu>
    </Header>
  );
};

export default HeaderPage;
