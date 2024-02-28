import { MenuOutlined } from "@ant-design/icons";
import useProductsService from "~/lib/services/products";
import type { MenuProps } from "antd";
import { Dropdown, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { FC, ReactElement } from "react";
import useSWR from "swr";
interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const Lista: FC = (): ReactElement => {
  const service = useProductsService();

  const { data, isLoading } = useSWR("/products", async () => service.get());

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

  return (
    <Table bordered columns={columns} loading={isLoading} dataSource={data} />
  );
};

export default Lista;
