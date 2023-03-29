import { Card, Link } from "~/components";
import { Breadcrumb, Button } from "antd";
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
          <Link href="/produtos">
            <a>Produtos</a>
          </Link>
        </Breadcrumb.Item>
      </Breadcrumb>

      <Card
        title="Listagem de Produtos"
        filtros={
          <Button type="primary" onClick={() => setIsModal(true)}>
            Novo Produto
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
