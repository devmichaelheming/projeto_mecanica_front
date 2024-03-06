import { Table } from "antd";
import React, { FC, ReactElement } from "react";

import { UsersProps } from "../models";
import { ColunasTabela } from "./columns";

interface ListaProps {
  data: Array<UsersProps>;
  isValidating: boolean;
  onExcluir: (registro: UsersProps) => void;
  onEditar: (registro: UsersProps) => void;
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
