import useUsersService from "~/lib/services/users";
import { message, Table } from "antd";
import React, { FC, ReactElement } from "react";

import { UsersProps } from "../models";
import { ColunasTabela } from "./columns";

interface ListaProps {
  data: Array<UsersProps>;
  isLoading: boolean;
  onExcluir: (registro: UsersProps) => void;
  onEditar: (registro: UsersProps) => void;
}

const Lista: FC<ListaProps> = ({
  data,
  isLoading,
  onEditar,
  onExcluir,
}): ReactElement => {
  return (
    <Table
      bordered
      columns={ColunasTabela({ onExcluir, onEditar })}
      loading={isLoading}
      dataSource={data}
    />
  );
};

export default Lista;
