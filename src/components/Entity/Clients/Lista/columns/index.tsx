import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuActions, { ItemProps } from "~/components/MenuActions";
import { handleHideLastDigitsCpf } from "~/lib/utils/_funcoes";
import { Tag } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

import { ClientsProps } from "../../models";

interface IColunasAvaliacaoGratuita {
  onExcluir: (registro: ClientsProps) => void;
  onEditar: (registro: ClientsProps) => void;
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
      title: "Nome/Razão social",
      width: "15%",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (data: string, registro: ClientsProps) =>
        registro.razaoSocial
          ? registro.razaoSocial
          : `${registro.name} ${registro.surname}`,
    },
    {
      title: "CPF/CNPJ",
      width: "15%",
      dataIndex: "cpfOrCnpj",
      key: "cpfOrCnpj",
      fixed: "left",
      render: (item, registro: ClientsProps) => {
        return registro.document.length === 14
          ? handleHideLastDigitsCpf(registro.document)
          : registro.document;
      },
    },
    {
      title: "E-Mail",
      width: "15%",
      dataIndex: "email",
      key: "email",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Telefone",
      width: "10%",
      dataIndex: "cellPhone",
      key: "cellPhone",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Localidade",
      width: "10%",
      dataIndex: "localidade",
      key: "localidade",
      fixed: "left",
      render: (data: string, registro: ClientsProps) => {
        return `${registro.cidade} - ${registro.estado}`;
      },
    },
    {
      title: "Ações",
      key: "acao",
      width: "5%",
      align: "center",
      render: (record: ClientsProps) => {
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
