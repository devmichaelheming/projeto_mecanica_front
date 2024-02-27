import { Card } from "~/components";
import Breadcrumb from "~/components/Breadcrumb";
import { Button } from "antd";
import React, { FC, ReactElement, useState } from "react";

import Form from "../Form";
import Lista from "../Lista";

const BreadcrumbData = [
  {
    id: "1",
    title: "Home",
    href: "/",
  },
  {
    id: "2",
    title: "Usuários",
    href: "/usuarios",
  },
];

const Pagina: FC = (): ReactElement => {
  const [isModal, setIsModal] = useState(false);

  return (
    <>
      <Breadcrumb data={BreadcrumbData} />

      <Card
        title="Usuários"
        filtros={
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
