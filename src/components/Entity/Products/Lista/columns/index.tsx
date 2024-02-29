import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
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
      fixed: "right",
      render: (record: ProductProps) => {
        const items: MenuProps["items"] = [
          {
            key: "1",
            label: (
              <S.BoxActions>
                <DeleteOutlined />
                <span>Excluir</span>
              </S.BoxActions>
            ),
            onClick: () => onExcluir(record),
          },
          {
            key: "2",
            label: (
              <S.BoxActions>
                <EditOutlined />
                <span>Editar</span>
              </S.BoxActions>
            ),
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
