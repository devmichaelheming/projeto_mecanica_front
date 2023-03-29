import { api } from "~/utils/services/api";
import { Button, Form, Input, InputNumber, Modal } from "antd";
import { MaskedInput } from "antd-mask-input";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from "react";

import { UsersProps } from "../models";

interface FormProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const FormPage: FC<FormProps> = ({ isModal, setIsModal }): ReactElement => {
  const [form] = Form.useForm<UsersProps>();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelModal = () => {
    form.resetFields();
    setIsModal(false);
    console.log("reset");
  };

  const handleSendData = (payload: UsersProps) => {
    api
      .post("/users", payload)
      .then((response) => {
        setIsLoading(true);
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleSendData(values);
    });
  };

  return (
    <Modal
      title="Cadastrar Produto"
      open={isModal}
      destroyOnClose
      onCancel={() => handleCancelModal()}
      footer={
        <>
          <Button type="default" onClick={() => handleCancelModal()}>
            Cancelar
          </Button>

          <Button
            type="primary"
            onClick={() => handleSubmit()}
            loading={isLoading}
          >
            Cadastrar
          </Button>
        </>
      }
    >
      <Form form={form} layout="vertical" name="form-products">
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            {
              required: true,
              message: "O Nome é obrigatório!",
            },
          ]}
        >
          <Input placeholder="Insira o nome do produto" />
        </Form.Item>

        <Form.Item name="description" label="Descrição">
          <Input placeholder="Insira a descrição do produtos(opcional)" />
        </Form.Item>

        <Form.Item
          name="value"
          label="Valor"
          rules={[
            {
              required: true,
              message: "O Valor é obrigatório!",
            },
          ]}
        >
          <Input placeholder="Insira o valor do produto" />
        </Form.Item>

        <Form.Item
          name="amount"
          label="Quantidade em estoque"
          rules={[
            {
              required: true,
              message: "A Quantidade em estoque é obrigatória!",
            },
          ]}
        >
          <InputNumber min={1} defaultValue={1} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormPage;
