import { MenuOutlined, DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import { ColumnsType } from "antd/lib/table";
import React from "react";

import S from "./styles";

interface IColunasAvaliacaoGratuita {
  onExcluir: (registro: any) => void;
  onEditar: (registro: any) => void;
}

export const ColunasTabela = ({
  onExcluir,
  onEditar,
}: IColunasAvaliacaoGratuita): any[] => {
  const colunasSetor: ColumnsType = [
    {
      title: "Marca",
      width: "20%",
      dataIndex: "brand",
      key: "brand",
      fixed: "left",
    },
    {
      title: "Modelo",
      width: "20%",
      dataIndex: "model",
      key: "model",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Ano de fabricação",
      width: "30%",
      dataIndex: "yearOfManufacture",
      key: "yearOfManufacture",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Placa",
      width: "20%",
      dataIndex: "plate",
      key: "plate",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Ações",
      key: "acao",
      width: "10%",
      align: "center",
      render: (record: any) => {
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
