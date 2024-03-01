import AlertForm from "~/components/AlertForm";
import Modal from "~/components/Modal";
import useUsersService from "~/lib/services/users";
import { removeSpecialCharacters } from "~/lib/utils/_funcoes";
import { Button, Form, message } from "antd";
import axios from "axios";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import { UsersProps } from "../models";
import { formValidationMessages } from "./_funcoes";
import { Contact, Address, GeneralData } from "./Sections";

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
  const [listErrors, setListErrors] = useState<Array<string>>([]);
  const [typePerson, setTypePerson] = useState<"fisica" | "juridica">("fisica");
  const [listCities, setListCities] = useState<
    Array<{ label: string; value: string }>
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingGetCities, setIsLoadingGetCities] = useState(false);

  const handleCancelModal = () => {
    form.resetFields();
    setIsModal(false);
    setListErrors([]);
    setEntity(null);
  };

  const handleGetCities = async (uf: string) => {
    setIsLoadingGetCities(true);
    form.setFieldValue("cidade", null);

    try {
      const response = await axios.get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${uf}/municipios`
      );

      const cities = response.data || [];

      const formattedCities = cities.map((city) => ({
        label: city.nome,
        value: removeSpecialCharacters(city.nome)
          .toLowerCase()
          .replace(/\s+/g, "-"),
      }));

      setListCities(formattedCities);
      setIsLoadingGetCities(false);
    } catch (error) {
      setIsLoadingGetCities(false);
      throw error;
    }
  };

  const handleSendData = async (payload: UsersProps) => {
    try {
      setIsLoading(true);
      const resposta = await service.salvar({ ...payload, _id: entity._id });

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
        entity?._id
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
          {entity?._id ? "Atualizar" : "Cadastrar"}
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
      });
    }
  }, [entity]);

  return (
    <Modal
      title="Cadastrar cliente"
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

        <GeneralData typePerson={typePerson} setTypePerson={setTypePerson} />

        <Contact />

        <Address
          handleGetCities={handleGetCities}
          listCities={listCities}
          isLoadingGetCities={isLoadingGetCities}
        />
      </Form>
    </Modal>
  );
};

export default FormPage;
