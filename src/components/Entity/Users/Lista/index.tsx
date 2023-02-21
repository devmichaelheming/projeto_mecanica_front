import React, { FC, ReactElement } from "react";
import type { ColumnsType } from "antd/es/table";
import { MenuOutlined } from "@ant-design/icons";
import type { MenuProps } from "antd";
import { Dropdown, Space, Table } from "antd";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
  phone: string;
  cpf: string;
}

const Lista: FC = (): ReactElement => {
  const items: MenuProps["items"] = [
    {
      label: "Editar",
      key: "1",
    },
    {
      label: "Excluir",
      key: "2",
    },
  ];

  const columns: ColumnsType<DataType> = [
    {
      title: "Nome",
      width: 100,
      dataIndex: "name",
      key: "name",
      fixed: "left",
    },
    {
      title: "E-Mail",
      width: 100,
      dataIndex: "email",
      key: "email",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Telefone",
      width: 100,
      dataIndex: "phone",
      key: "phone",
      fixed: "left",
      sorter: true,
    },
    {
      title: "CPF",
      width: 100,
      dataIndex: "cpf",
      key: "cpf",
      fixed: "left",
      sorter: true,
    },
    {
      title: "Ações",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <MenuOutlined />
        </Dropdown>
      ),
    },
  ];

  const data: DataType[] = [
    {
      key: "1",
      name: "Michael Heming",
      email: "devmichael.heming@gmail.com",
      phone: "(66) 9.99717-7126",
      cpf: "054.242.452-99",
    },
    {
      key: "2",
      name: "Roseni Heming",
      email: "roseniheming@hotmail.com",
      phone: "(66) 9.9911-2343",
      cpf: "344.234.432-23",
    },
    {
      key: "3",
      name: "Paulo Jorge de Oliveira",
      email: "paulojorge@gmail.com",
      phone: "(66) 9.9965-1544",
      cpf: "054.342.232-11",
    },
  ];
  return (
    <>
      <Table columns={columns} dataSource={data} scroll={{ x: 1300 }} />
    </>
  );
};

export default Lista;
