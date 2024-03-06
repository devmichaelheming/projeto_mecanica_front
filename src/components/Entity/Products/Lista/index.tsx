import useProductsService from "~/lib/services/products";
import { message } from "antd";
import { Table } from "antd";
import React, { FC, ReactElement } from "react";

import { ProductProps } from "../models";
import { ColunasTabela } from "./columns";

interface ListaProps {
  data: Array<ProductProps>;
  isValidating: boolean;
  mutate: () => void;
}

const Lista: FC<ListaProps> = ({
  data,
  isValidating,
  mutate,
}): ReactElement => {
  const service = useProductsService();

  const onExcluir = async (registro: ProductProps) => {
    try {
      const resposta = await service.del(registro._id);

      console.log("resposta", resposta);

      message.success("Ocorreu um erro ao tentar excluir o usuário.");
    } catch (ex: any) {
      message.error(ex || "error");
    }
  };

  return (
    <Table
      bordered
      columns={ColunasTabela({ onExcluir })}
      loading={isValidating}
      dataSource={data}
    />
  );
};

export default Lista;
