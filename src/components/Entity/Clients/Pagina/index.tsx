import { Card } from "~/components";
import Breadcrumb from "~/components/Breadcrumb";
import useClientService from "~/lib/services/clients";
import { Button, message } from "antd";
import { isArray } from "lodash";
import React, { FC, ReactElement, useState } from "react";
import useSWR from "swr";

import Form from "../Form";
import Lista from "../Lista";
import { ClientsProps } from "../models";

const BreadcrumbData = [
  {
    id: "1",
    title: "Home",
    href: "/",
  },
  {
    id: "2",
    title: "Clientes",
    href: "/clientes",
  },
];

const Pagina: FC = (): ReactElement => {
  const service = useClientService();
  const [isModal, setIsModal] = useState(false);
  const [entity, setEntity] = useState<ClientsProps>({} as ClientsProps);

  const { data, isValidating, mutate } = useSWR("/clients", async () =>
    service.get()
  );

  const listClients = isArray(data) ? data : [];

  const onExcluir = async (registro: ClientsProps) => {
    try {
      const resposta = await service.del(registro._id);

      if (resposta.sucesso) {
        message.success(resposta.message);
        mutate();
        return;
      }

      message.success("Ocorreu um erro ao tentar excluir o cliente.");
    } catch (ex: any) {
      message.error(ex || "error");
    }
  };

  const onEditar = async (registro: ClientsProps) => {
    setIsModal(true);
    setEntity(registro);
  };

  return (
    <>
      <Breadcrumb data={BreadcrumbData} />

      <Card
        title="Clientes"
        filtros={
          <Button type="primary" onClick={() => setIsModal(true)}>
            Novo cliente
          </Button>
        }
      >
        <Lista
          data={listClients}
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
