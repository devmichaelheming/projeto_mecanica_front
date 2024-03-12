import AlertForm from "~/components/AlertForm";
import Modal from "~/components/Modal";
import useUsersService from "~/lib/services/users";
import { Button, Col, Form, Input, message, Row, Switch } from "antd";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import InputMask from "react-input-mask";

import { UsersProps } from "../models";
import S from "./styles";
import { formValidationMessages } from "./validationsMessages";
interface FormProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  mutate: () => void;
  entity: UsersProps;
  setEntity: Dispatch<SetStateAction<UsersProps>>;
}

const FormPage: FC<FormProps> = ({
  isModal,
  setIsModal,
  mutate,
  entity,
  setEntity,
}): ReactElement => {
  const [form] = Form.useForm<UsersProps>();
  const service = useUsersService();
  const [isLoading, setIsLoading] = useState(false);
  const [listErrors, setListErrors] = useState<Array<string>>([]);

  const handleCancelModal = () => {
    form.resetFields();
    setIsModal(false);
    setListErrors([]);
    setEntity(null);
  };

  const handleSendData = async (payload: UsersProps) => {
    try {
      setIsLoading(true);
      const resposta = await service.salvar({ ...payload, id: entity.id });

      if (!resposta.sucesso) {
        setListErrors(resposta.errors);
        setIsLoading(false);
        return;
      }

      mutate();
      setIsLoading(false);
      handleCancelModal();
      setListErrors([]);
      message.success(
        entity?.id
          ? "Dados atualizados com sucesso!"
          : "Dados salvos com sucesso!"
      );

      return true;
    } catch (ex: any) {
      message.error(ex || "Erro ao salvar os dados");
      return false;
    }
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
          {entity?.id ? "Atualizar" : "Cadastrar"}
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (entity) {
      form.setFieldsValue({
        name: entity.name,
        surname: entity.surname,
        email: entity.email,
        cpf: entity.cpf,
        active: entity.active,
      });
    }
  }, [entity]);

  return (
    <Modal
      title="Cadastrar Usuário"
      isOpen={isModal}
      onClose={() => handleCancelModal()}
      footer={renderButtonsFooter()}
    >
      <Form
        form={form}
        layout="vertical"
        name="nest-messages"
        validateMessages={formValidationMessages}
      >
        {listErrors.length > 0 && (
          <AlertForm type="warning" errors={listErrors} />
        )}

        <S.Section>
          <h3>Configurações</h3>
        </S.Section>

        <Form.Item name="active" label="Usuário ativo?" initialValue={true}>
          <Switch defaultChecked />
        </Form.Item>

        <S.Section>
          <h3>Dados gerais</h3>
        </S.Section>

        <Row
          gutter={8}
          style={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <Col span={12}>
            <Form.Item
              name="name"
              label="Nome"
              rules={[{ required: true }, { max: 100 }, { min: 3 }]}
            >
              <Input placeholder="Insira o nome do usuário" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="surname"
              label="Sobrenome"
              rules={[
                {
                  required: true,
                },
                { max: 100 },
                { min: 3 },
              ]}
            >
              <Input placeholder="Insira o sobrenome do usuário" />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[{ required: true }, { max: 200 }, { type: "email" }]}
        >
          <Input placeholder="Insira o e-mail do usuário" />
        </Form.Item>

        <Form.Item name="cpf" label="CPF" rules={[{ required: true }]}>
          <InputMask mask="999.999.999-99">
            {(inputProps) => (
              <Input
                {...inputProps}
                id="input-cpf"
                placeholder="Insira o cpf do usuário"
              />
            )}
          </InputMask>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormPage;
