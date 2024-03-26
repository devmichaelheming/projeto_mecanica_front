import { Card } from "~/components";
import Breadcrumb from "~/components/Breadcrumb";
import useUsersService from "~/lib/services/users";
import { Button, message } from "antd";
import { isArray } from "lodash";
import React, { FC, ReactElement, useState } from "react";
import useSWR from "swr";

import Form from "../Form";
import Lista from "../Lista";
import { UsersProps } from "../models";

const BreadcrumbData = [
  {
    title: "Home",
    link: "/home",
  },
  {
    title: "Usuários",
    link: "/home/usuarios",
  },
];

const Pagina: FC = (): ReactElement => {
  const service = useUsersService();
  const [isModal, setIsModal] = useState(false);
  const [entity, setEntity] = useState<UsersProps>({} as UsersProps);

  const { data, isValidating, mutate } = useSWR("/users", async () =>
    service.get()
  );

  const listUsers = isArray(data) ? data : [];

  const onExcluir = async (registro: UsersProps) => {
    try {
      const resposta = await service.activateOrDeactivate(registro.id);

      if (resposta.sucesso) {
        message.success(resposta.message);
        mutate();
        return;
      }

      message.success(
        `Ocorreu um erro ao tentar
        ${registro.active ? "inativar" : "ativar"} o usuário.`
      );
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
          data={listUsers}
          isValidating={isValidating}
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
