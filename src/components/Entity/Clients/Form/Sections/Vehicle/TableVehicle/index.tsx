import { Table } from "antd";
import React, { FC, ReactElement } from "react";

import { ColunasTabela } from "./columns";

interface ListaProps {
  data: Array<any>;
  onExcluir: (registro: any) => void;
  onEditar: (registro: any) => void;
}

const Lista: FC<ListaProps> = ({ data, onEditar, onExcluir }): ReactElement => {
  return (
    <>
      <Table
        bordered
        columns={ColunasTabela({ onExcluir, onEditar })}
        dataSource={data}
      />
    </>
  );
};

export default Lista;
