import AlertForm from "~/components/AlertForm";
import Modal from "~/components/Modal";
import useClientService from "~/lib/services/clients";
import { scrollToTop, validateCpfOrCnpj } from "~/lib/utils/_funcoes";
import { Button, Form, message, Modal as ModalAntd } from "antd";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { ClientsProps, VehiclesProps } from "../models";
import { formValidationMessages } from "./_funcoes";
import { Contact, Address, GeneralData, Vehicle } from "./Sections";

interface FormProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  mutate: () => void;
  entity: ClientsProps;
  setEntity: Dispatch<SetStateAction<ClientsProps>>;
  typeForm: "edit" | "new";
  setTypeForm: Dispatch<SetStateAction<"edit" | "new">>;
}

const FormPage: FC<FormProps> = ({
  isModal,
  setIsModal,
  mutate,
  entity,
  setEntity,
  setTypeForm,
  typeForm,
}): ReactElement => {
  const [form] = Form.useForm<ClientsProps>();
  const service = useClientService();
  const [listErrors, setListErrors] = useState<Array<string>>([]);
  const [typePerson, setTypePerson] = useState<"fisica" | "juridica">("fisica");
  const [isLoading, setIsLoading] = useState(false);
  const [listVehicles, setListVehicles] = useState<Array<VehiclesProps>>([]);
  const [disableCpfOrCnpj, setDisableCpfOrCnpj] = useState(false);

  const isEdition = entity?.id ? true : false;

  const handleCancelModal = () => {
    setIsModal(false);
    setListErrors([]);
    setEntity(null);
    setIsLoading(false);
    setListVehicles([]);
    setTypeForm("edit");
    setTypePerson("fisica");
    setDisableCpfOrCnpj(false);
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
    form.validateFields().then(async (values: ClientsProps) => {
      if (values.document) {
        const validate = validateCpfOrCnpj(values.document);

        if (!validate) {
          scrollToTop();
          setListErrors(["O CPF informado é inválido."]);
          return;
        }

        setListErrors([]);
      }

      setIsLoading(true);
      const payload = {
        ...values,
        typePerson: typePerson,
        id: entity?.id,
        vehicles: listVehicles,
        active: true,
      };

      try {
        const resposta = await service.salvar(payload);

        if (!resposta.sucesso) {
          setListErrors(resposta.errors);
          setIsLoading(false);
          scrollToTop();
          return;
        }

        handleCancelModal();
        mutate();
        message.success(
          isEdition
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
        <Button type="default" onClick={() => handleConfirmCancelModal()}>
          Cancelar
        </Button>

        <Button
          type="primary"
          onClick={() => handleSendData()}
          loading={isLoading}
        >
          {isEdition ? "Atualizar" : "Cadastrar"}
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (typeForm === "edit" && isEdition) {
      setTypePerson(entity.typePerson === "fisica" ? "fisica" : "juridica");
      setDisableCpfOrCnpj(true);

      form.setFieldsValue({
        tipoDocumento: entity.typePerson,
        document: entity.document,
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
      onClose={() => handleConfirmCancelModal()}
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

        <GeneralData
          typePerson={typePerson}
          setTypePerson={setTypePerson}
          disableCpfOrCnpj={disableCpfOrCnpj}
        />

        <Contact form={form} />

        <Address form={form} />

        <Vehicle
          entity={entity}
          setListVehicles={setListVehicles}
          listVehicles={listVehicles}
        />
      </Form>
    </Modal>
  );
};

export default FormPage;
