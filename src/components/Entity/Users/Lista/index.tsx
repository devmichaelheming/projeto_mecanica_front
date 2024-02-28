import useUsersService from "~/lib/services/users";
import { message, Table } from "antd";
import React, { FC, ReactElement } from "react";

import { UsersProps } from "../models";
import { ColunasTabela } from "./columns";

interface ListaProps {
  data: Array<UsersProps>;
  isLoading: boolean;
  mutate: () => void;
}

const Lista: FC<ListaProps> = ({ data, isLoading, mutate }): ReactElement => {
  const service = useUsersService();

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

  return (
    <Table
      bordered
      columns={ColunasTabela({ onExcluir })}
      loading={isLoading}
      dataSource={data}
    />
  );
};

export default Lista;
