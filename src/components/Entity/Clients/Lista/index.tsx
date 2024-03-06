import { Table } from "antd";
import React, { FC, ReactElement } from "react";

import { ClientsProps } from "../models";
import { ColunasTabela } from "./columns";

interface ListaProps {
  data: Array<ClientsProps>;
  isValidating: boolean;
  onExcluir: (registro: ClientsProps) => void;
  onEditar: (registro: ClientsProps) => void;
}

const Lista: FC<ListaProps> = ({
  data,
  isValidating,
  onEditar,
  onExcluir,
}): ReactElement => {
  return (
    <Table
      bordered
      columns={ColunasTabela({ onExcluir, onEditar })}
      loading={isValidating}
      dataSource={data}
    />
  );
};

export default Lista;
