import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import MenuActions from "~/components/MenuActions";
import { handleFormatCnpjCpf } from "~/lib/utils/_funcoes";
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
      title: "Nome/Razão social",
      width: "25%",
      dataIndex: "name",
      key: "name",
      fixed: "left",
      render: (data: string, registro: ClientsProps) =>
        registro.razaoSocial ? registro.razaoSocial : registro.name,
    },
    {
      title: "CPF/CNPJ",
      width: "25%",
      dataIndex: "cpfOrCnpj",
      key: "cpfOrCnpj",
      fixed: "left",
      render: (data: string, registro: ClientsProps) =>
        handleFormatCnpjCpf(registro.cpf || registro.cnpj),
    },
    {
      title: "E-Mail",
      width: "25%",
      dataIndex: "email",
      key: "email",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Telefone",
      width: "25%",
      dataIndex: "cellPhone",
      key: "cellPhone",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Localidade",
      width: "20%",
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
      width: "15%",
      align: "center",
      render: (record: ClientsProps) => {
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
