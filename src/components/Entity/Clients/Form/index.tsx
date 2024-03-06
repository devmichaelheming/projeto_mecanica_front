import AlertForm from "~/components/AlertForm";
import Modal from "~/components/Modal";
import useClientService from "~/lib/services/clients";
import { Button, Form, message } from "antd";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ClientsProps } from "../models";
import { formValidationMessages } from "./_funcoes";
import { Contact, Address, GeneralData, Vehicle } from "./Sections";

interface FormProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  mutate: () => void;
  entity: ClientsProps;
  setEntity: Dispatch<SetStateAction<ClientsProps>>;
}

const FormPage: FC<FormProps> = ({
  isModal,
  setIsModal,
  mutate,
  entity,
  setEntity,
}): ReactElement => {
  const [form] = Form.useForm<ClientsProps>();
  const service = useClientService();
  const [listErrors, setListErrors] = useState<Array<string>>([]);
  const [typePerson, setTypePerson] = useState<"fisica" | "juridica">("fisica");
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelModal = () => {
    setIsModal(false);
    setListErrors([]);
    setEntity(null);
    setIsLoading(false);
  };

  const handleSendData = async () => {
    form.validateFields().then(async (values: ClientsProps) => {
      setIsLoading(true);
      const payload = { ...values, typePerson: typePerson, _id: entity?._id };

      try {
        const resposta = await service.salvar(payload);

        if (!resposta.sucesso) {
          setListErrors(resposta.errors);
          setIsLoading(false);
          return;
        }

        handleCancelModal();
        mutate();
        message.success(
          entity?._id
            ? "Cliente atualizado com sucesso!"
            : "Cliente cadastrado com sucesso!"
        );

        return true;
      } catch (ex: any) {
        message.error(ex || "Erro ao salvar os dados");
        return false;
      }
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
          onClick={() => handleSendData()}
          loading={isLoading}
        >
          {entity?._id ? "Atualizar" : "Cadastrar"}
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (entity?._id) {
      setTypePerson(entity.typePerson === "fisica" ? "fisica" : "juridica");

      form.setFieldsValue({
        tipoDocumento: entity.typePerson,
        cpf: entity.cpf,
        cnpj: entity.cnpj,
        name: entity.name,
        surname: entity.surname,
        razaoSocial: entity.razaoSocial,
        nomeFantasia: entity.nomeFantasia,
        email: entity.email,
        cellPhone: entity.cellPhone,
        whatsapp: entity.whatsapp,
        cep: entity.cep,
        rua: entity.rua,
        numero: entity.numero,
        bairro: entity.bairro,
        estado: entity.estado,
        cidade: entity.cidade,
      });
    } else {
      form.resetFields();
    }
  }, [entity]);

  return (
    <Modal
      title="Cadastrar cliente"
      isOpen={isModal}
      onClose={() => handleCancelModal()}
      footer={renderButtonsFooter()}
      width={700}
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

        <GeneralData typePerson={typePerson} setTypePerson={setTypePerson} />

        <Contact form={form} />

        <Address form={form} />

        <Vehicle />
      </Form>
    </Modal>
  );
};

export default FormPage;
