import { Card } from "~/components";
import Breadcrumb from "~/components/Breadcrumb";
import useUsersService from "~/lib/services/users";
import { Button, message } from "antd";
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
  const [entity, setEntity] = useState<UsersProps>({} as UsersProps);

  const { data, isLoading, mutate } = useSWR("/users", async () =>
    service.get()
  );

  const onExcluir = async (registro: UsersProps) => {
    try {
      const resposta = await service.del(registro._id);

      if (resposta.sucesso) {
        message.success(resposta.message);
        mutate();
        return;
      }

      message.success("Ocorreu um erro ao tentar excluir o usuário.");
    } catch (ex: any) {
      message.error(ex || "error");
    }
  };

  const onEditar = async (registro: UsersProps) => {
    setIsModal(true);
    setEntity(registro);
  };

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
        <Lista
          data={data || []}
          isLoading={isLoading}
          onExcluir={onExcluir}
          onEditar={onEditar}
        />
      </Card>

      <Form
        isModal={isModal}
        setIsModal={setIsModal}
        mutate={mutate}
        entity={entity}
        setEntity={setEntity}
      />
    </>
  );
};

export default Pagina;
