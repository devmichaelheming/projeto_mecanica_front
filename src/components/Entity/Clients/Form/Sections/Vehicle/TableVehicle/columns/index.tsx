import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { VehiclesProps } from "~/components/Entity/Clients/models";
import MenuActions from "~/components/MenuActions";
import { ColumnsType } from "antd/lib/table";
import React from "react";

interface IColunasAvaliacaoGratuita {
  onExcluir: (registro: VehiclesProps) => void;
  onEditar: (registro: VehiclesProps) => void;
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
      dataIndex: "yearManufacture",
      key: "yearManufacture",
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
