import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

import { UsersProps } from "../../models";
import S from "./styles";

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
      width: "45%",
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "CPF",
      width: "45%",
      dataIndex: "cpf",
      key: "cpf",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Ações",
      key: "acao",
      width: "10%",
      fixed: "right",
      render: (record: UsersProps) => {
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
