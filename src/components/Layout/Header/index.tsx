import { Layout } from "antd";
import React, { FC, ReactElement } from "react";
import { UserOutlined } from "@ant-design/icons";
import S from "./styles";

const HeaderPage: FC = (): ReactElement => {
  return (
    <S.Container>
      <UserOutlined />
    </S.Container>
  );
};

export default HeaderPage;
