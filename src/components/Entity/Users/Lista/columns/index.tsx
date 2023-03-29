import { MenuOutlined } from "@ant-design/icons";
import { Dropdown, MenuProps } from "antd";
import type { ColumnsType } from "antd/es/table";

import { UsersProps } from "../../models";

interface DataType {
  key: React.Key;
  name: string;
  email: string;
}

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

export const columns: ColumnsType<DataType> = [
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
    render: (record: UsersProps) => (
      <Dropdown menu={{ items }} trigger={["click"]}>
        <MenuOutlined />
      </Dropdown>
    ),
  },
];
