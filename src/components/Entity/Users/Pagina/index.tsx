import { Card } from "~/components";
import Breadcrumb from "~/components/Breadcrumb";
import useUsersService from "~/lib/services/users";
import { Button } from "antd";
import React, { FC, ReactElement, useState } from "react";
import useSWR from "swr";

import Form from "../Form";
import Lista from "../Lista";
import { UsersProps } from "../models";

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
  const service = useUsersService();
  const [isModal, setIsModal] = useState(false);

  const { data, isLoading, mutate } = useSWR("/users", async () =>
    service.get()
  );

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
        <Lista data={data || []} isLoading={isLoading} mutate={mutate} />
      </Card>

      <Form isModal={isModal} setIsModal={setIsModal} mutate={mutate} />
    </>
  );
};

export default Pagina;
