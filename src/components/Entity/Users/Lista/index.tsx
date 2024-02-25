import { api } from "~/utils/services/api";
import type { MenuProps } from "antd";
import { Dropdown, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { FC, ReactElement } from "react";
import { useQuery } from "react-query";
import MenuIcon from "~/assets/icons/menuIcon.svg";
import Image from "next/image";
interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

const Lista: FC = (): ReactElement => {
  const { data, isLoading } = useQuery(
    "users",
    async () => {
      const response = await api.get("/users");

      return response.data;
    },
    {
      staleTime: 1000 * 60,
    }
  );

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
      title: "Ações",
      key: "operation",
      fixed: "right",
      width: 100,
      render: () => (
        <Dropdown menu={{ items }} trigger={["click"]}>
          <Image src={MenuIcon} style={{ cursor: "pointer" }} />
        </Dropdown>
      ),
    },
  ];

  return (
    <Table bordered columns={columns} loading={isLoading} dataSource={data} />
  );
};

export default Lista;
