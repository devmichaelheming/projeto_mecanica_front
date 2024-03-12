import { VehiclesProps } from "~/components/Entity/Clients/models";
import { Table } from "antd";
import React, { FC, ReactElement } from "react";

import { ColunasTabela } from "./columns";

interface ListaProps {
  data: Array<VehiclesProps>;
  onExcluir: (registro: VehiclesProps) => void;
  onEditar: (registro: VehiclesProps) => void;
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
