import { Button, Form, Input, InputNumber, Modal } from "antd";
// import { MaskedInput } from "antd-mask-input";
import React, { Dispatch, FC, ReactElement, SetStateAction } from "react";

interface FormProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const FormPage: FC<FormProps> = ({ isModal, setIsModal }): ReactElement => {
  const [form] = Form.useForm();

  const validateMessages = {
    required: "${label} é obrigatório!",
    types: {
      email: "${label} is not a valid email!",
      number: "${label} is not a valid number!",
    },
    number: {
      range: "${label} must be between ${min} and ${max}",
    },
  };

  const handleCancelModal = () => {
    form.resetFields();
    setIsModal(false);
    console.log("reset");
  };

  const handleSaveData = () => {
    form
      .validateFields()
      .then((values) => {
        console.log("values", values);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  return (
    <Modal
      title="Cadastrar Usuário"
      open={isModal}
      destroyOnClose
      onCancel={() => handleCancelModal()}
      footer={
        <>
          <Button type="primary" onClick={() => handleSaveData()}>
            Submit
          </Button>

          <Button type="default" onClick={() => handleCancelModal()}>
            Cancelar
          </Button>
        </>
      }
    >
      <Form
        form={form}
        layout="vertical"
        name="nest-messages"
        validateMessages={validateMessages}
      >
        <Form.Item name="name" label="Nome" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[{ type: "email", required: true }]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
          <Input />
        </Form.Item>

        <Form.Item
          name="telefone"
          label="Telefone"
          rules={[{ required: true }]}
        >
          {/* <MaskedInput id="input-telefone" mask="(00) 0 0000 0000" /> */}
        </Form.Item>
        {/* <Form.Item
          name={["user", "age"]}
          label="Age"
          rules={[{ type: "number", min: 0, max: 99 }]}
        >
          <InputNumber />
        </Form.Item> */}
      </Form>
    </Modal>
  );
};

export default FormPage;
