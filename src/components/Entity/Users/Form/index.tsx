import { api } from "~/utils/services/api";
import { Button, Form, Input, message, Modal } from "antd";
import { MaskedInput } from "antd-mask-input";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useState,
} from "react";

import { UsersProps } from "../models";
import { validateMessages } from "./validationsMessages";

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
  };

  const handleSendData = (payload: UsersProps) => {
    setIsLoading(true);
    api
      .post("/users", payload)
      .then((response) => {
        setIsLoading(false);

        setTimeout(() => {
          handleCancelModal();
        }, 500);

        message.open({
          type: "success",
          content: response.data.message,
        });
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

  const renderButtonsFooter = () => {
    return (
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
    );
  };

  return (
    <Modal
      title="Cadastrar Usuário"
      open={isModal}
      destroyOnClose
      onCancel={() => handleCancelModal()}
      footer={renderButtonsFooter()}
    >
      <Form
        form={form}
        layout="vertical"
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item
          name="name"
          label="Nome"
          rules={[
            { required: true, message: "O Nome do usuário é obrigatório!" },
          ]}
        >
          <Input placeholder="Insira o nome do usuário" />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: "email",
              required: true,
            },
          ]}
        >
          <Input placeholder="Insira o e-mail do usuário" />
        </Form.Item>

        <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
          <MaskedInput id="input-cpf" mask="000.000.000-00" />
        </Form.Item>

        <Form.Item
          name="password"
          label="Senha"
          rules={[
            { required: true, min: 8, message: "A Senha é obrigatória!" },
          ]}
        >
          <Input type="password" placeholder="Insira a senha do usuário" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormPage;
