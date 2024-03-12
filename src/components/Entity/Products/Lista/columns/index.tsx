import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuActions from "~/components/MenuActions";
import { Dropdown, MenuProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

import { ProductProps } from "../../models";
import S from "./styles";

interface IColunasAvaliacaoGratuita {
  onExcluir: (registro: ProductProps) => void;
}

export const ColunasTabela = ({
  onExcluir,
}: IColunasAvaliacaoGratuita): any[] => {
  const colunasSetor: ColumnsType = [
    {
      title: "Nome",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "Descrição",
      width: 100,
      dataIndex: "description",
      key: "description",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Valor",
      width: 100,
      dataIndex: "value",
      key: "value",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Ações",
      key: "acao",
      width: 88,
      align: "center",
      render: (record: ProductProps) => {
        const items = [
          {
            title: "Editar",
            icon: <EditOutlined />,
            onClick: () => console.log(record),
          },
          {
            title: "Excluir",
            icon: <DeleteOutlined />,
            onClick: () => onExcluir(record),
            danger: true,
          },
        ];

        return <MenuActions items={items} />;
      },
    },
  ];

  return colunasSetor;
};
