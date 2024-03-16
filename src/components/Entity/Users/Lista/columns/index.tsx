import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuActions, { ItemProps } from "~/components/MenuActions";
import { handleHideLastDigitsCpf } from "~/lib/utils/_funcoes";
import { Tag } from "antd";
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
      title: "Status",
      width: "5%",
      dataIndex: "active",
      key: "active",
      fixed: "left",
      sorter: true,
      render: (registro) => (
        <Tag color={registro ? "green" : "red"}>
          {registro ? "Ativo" : "Inativo"}
        </Tag>
      ),
    },
    {
      title: "Nome",
      width: "30%",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (item, registro: UsersProps) =>
        `${registro.name} ${registro.surname}`,
      sorter: true,
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
      title: "CPF",
      width: "20%",
      dataIndex: "cpf",
      key: "cpf",
      fixed: "left",
      sorter: true,
      render: (registro) => handleHideLastDigitsCpf(registro),
    },
    {
      title: "Ações",
      key: "acao",
      width: "5%",
      align: "center",
      render: (record: UsersProps) => {
        const items: Array<ItemProps> = [
          {
            title: "Editar",
            icon: <EditOutlined />,
            onClick: () => onEditar(record),
          },
          {
            title: record.active ? "Inativar" : "Ativar",
            icon: <DeleteOutlined />,
            onClick: () => onExcluir(record),
            typeButton: record.active ? "Danger" : "Success",
          },
        ];

        return <MenuActions items={items} />;
      },
    },
  ];

  return colunasSetor;
};
