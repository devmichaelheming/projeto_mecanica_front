import AlertForm from "~/components/AlertForm";
import Modal from "~/components/Modal";
import useUsersService from "~/lib/services/users";
import {
  Button,
  Col,
  Form,
  Input,
  message,
  Row,
  Switch,
  Modal as ModalAntd,
} from "antd";
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
  const [disableCpf, setDisableCpf] = useState(false);

  const isEdition = entity?.id ? true : false;

  const handleCancelModal = () => {
    setIsModal(false);
    setListErrors([]);
    setEntity(null);
    setIsLoading(false);
    setDisableCpf(false);
  };

  const handleConfirmCancelModal = () => {
    ModalAntd.confirm({
      title: "Deseja realmente fechar?",
      content: "Ao confirmar, as alterações serão descartadas.",
      centered: true,
      okText: "Confirmar",
      onOk: () => {
        handleCancelModal();
      },
    });
  };

  const handleSendData = async () => {
    form.validateFields().then(async (values: UsersProps) => {
      try {
        setIsLoading(true);

        const resposta = await service.salvar({
          ...values,
          id: entity.id,
          active: true,
        });

        if (!resposta.sucesso) {
          setListErrors(resposta.errors);
          setIsLoading(false);
          return;
        }

        mutate();
        handleCancelModal();
        message.success(
          isEdition
            ? "Dados atualizados com sucesso!"
            : "Dados salvos com sucesso!"
        );

        return true;
      } catch (ex: any) {
        message.error(ex || "Erro ao salvar os dados");
        setIsLoading(false);
        return false;
      }
    });
  };

  const renderButtonsFooter = () => {
    return (
      <>
        <Button type="default" onClick={() => handleConfirmCancelModal()}>
          Cancelar
        </Button>

        <Button type="primary" onClick={handleSendData} loading={isLoading}>
          {isEdition ? "Atualizar" : "Cadastrar"}
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (isEdition) {
      form.setFieldsValue({
        name: entity.name,
        surname: entity.surname,
        email: entity.email,
        cpf: entity.cpf,
      });

      setDisableCpf(true);
    } else {
      form.resetFields();
    }
  }, [entity]);

  return (
    <Modal
      title="Cadastrar Usuário"
      isOpen={isModal}
      onClose={() => handleConfirmCancelModal()}
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
          {disableCpf ? (
            <Input disabled />
          ) : (
            <InputMask mask="999.999.999-99">
              {(inputProps) => (
                <Input
                  {...inputProps}
                  id="input-cpf"
                  placeholder="Insira o cpf do usuário"
                />
              )}
            </InputMask>
          )}
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default FormPage;
