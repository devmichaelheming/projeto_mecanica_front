import { Card } from "~/components";
import Breadcrumb from "~/components/Breadcrumb";
import useProductsService from "~/lib/services/products";
import { Button } from "antd";
import React, { FC, ReactElement, useState } from "react";
import useSWR from "swr";

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
    title: "Produtos",
    href: "/produtos",
  },
];

const Pagina: FC = (): ReactElement => {
  const service = useProductsService();
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading, mutate } = useSWR("/products", async () =>
    service.get()
  );

  return (
    <>
      <Breadcrumb data={BreadcrumbData} />

      <Card
        title="Listagem de Produtos"
        filtros={
          <Button type="primary" onClick={() => setIsModal(true)}>
            Novo Produto
          </Button>
        }
      >
        <Lista data={data || []} isLoading={isLoading} mutate={mutate} />
      </Card>

      <Form isModal={isModal} setIsModal={setIsModal} />
    </>
  );
};

export default Pagina;
