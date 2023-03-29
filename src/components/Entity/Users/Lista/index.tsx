import { api } from "~/utils/services/api";
import { Table } from "antd";
import React, { FC, ReactElement } from "react";
import { useQuery } from "react-query";

import { columns } from "./columns";

const Lista: FC = (): ReactElement => {
  const { data, isLoading } = useQuery(
    "users",
    async () => {
      const response = await api.get("/users");

      return response.data;
    },
    {
      staleTime: 1000 * 60, // 1 minute
    }
  );

  return (
    <Table bordered columns={columns} loading={isLoading} dataSource={data} />
  );
};

export default Lista;
