import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

import { ClientsProps } from "../../models";
import S from "./styles";

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
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <S.BoxActions>
                <EditOutlined />
                <span>Editar</span>
              </S.BoxActions>
            ),
            onClick: () => onEditar(record),
          },
          {
            key: "2",
            label: (
              <S.BoxActions danger>
                <DeleteOutlined />
                <span>Excluir</span>
              </S.BoxActions>
            ),
            onClick: () => onExcluir(record),
          },
        ];

        return (
          <Dropdown menu={{ items }} trigger={["click"]}>
            <MenuOutlined />
          </Dropdown>
        );
      },
    },
  ];

  return colunasSetor;
};
