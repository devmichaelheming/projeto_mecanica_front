import { Breadcrumb } from "antd";
import React, { FC, ReactElement } from "react";

import Lista from "../Lista";

const Pagina: FC = (): ReactElement => {
  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <a href="/">Home</a>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <a href="/usuarios">Usuários</a>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Lista />
    </>
  );
};

export default Pagina;
