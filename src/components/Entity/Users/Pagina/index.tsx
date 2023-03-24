import { Breadcrumb, Button, Card } from "antd";
import Link from "next/link";
import React, { FC, ReactElement, useState } from "react";

import Form from "../Form";
import Lista from "../Lista";

const Pagina: FC = (): ReactElement => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Breadcrumb style={{ margin: "16px 0" }}>
        <Breadcrumb.Item>
          <Link href="/">
            <a>Home</a>
          </Link>
        </Breadcrumb.Item>

        <Breadcrumb.Item>
          <Link href="/usuarios">
            <a>Usuários</a>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card
        title="Listagem de Usuários"
        type="inner"
        extra={
          <Button type="primary" onClick={() => setIsModal(true)}>
            Novo Usuário
          </Button>
        }
      >
        <Lista />
      </Card>

      <Form isModal={isModal} setIsModal={setIsModal} />
    </>
  );
};

export default Pagina;
