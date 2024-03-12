import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuActions from "~/components/MenuActions";
import { ColumnsType } from "antd/lib/table";
import React from "react";

import { UsersProps } from "../../models";

interface IColunasAvaliacaoGratuita {
  onExcluir: (registro: UsersProps) => void;
  onEditar: (registro: UsersProps) => void;
}

export const ColunasTabela = ({
  onExcluir,
  onEditar,
}: IColunasAvaliacaoGratuita): any[] => {
  const colunasSetor: ColumnsType = [
    {
      title: "Nome",
      width: "30%",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "E-Mail",
      width: "30%",
      dataIndex: "email",
      key: "email",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Usuário ativo",
      width: "30%",
      dataIndex: "active",
      key: "active",
      fixed: "left",
      sorter: true,
      render: (registro) => (registro ? "Sim" : "Não"),
    },
    {
      title: "Ações",
      key: "acao",
      width: "10%",
      align: "center",
      render: (record: UsersProps) => {
        const items = [
          {
            title: "Editar",
            icon: <EditOutlined />,
            onClick: () => onEditar(record),
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
