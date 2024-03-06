import { PlusOutlined } from "@ant-design/icons";
import AlertForm from "~/components/AlertForm";
import Modal from "~/components/Modal";
import useUsersService from "~/lib/services/users";
import { removeSpecialCharacters } from "~/lib/utils/_funcoes";
import {
  Button,
  Divider,
  Form,
  InputRef,
  message,
  Select,
  Space,
  Input,
} from "antd";
import axios from "axios";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useRef,
  useState,
} from "react";

interface FormProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
}

const listPlate = [
  {
    value: "bmw",
    label: "BMW",
  },
  {
    value: "byd",
    label: "BYD",
  },
  {
    value: "chevrolet",
    label: "Chevrolet",
  },
];

const FormPage: FC<FormProps> = ({ isModal, setIsModal }): ReactElement => {
  const [form] = Form.useForm<any>();
  const service = useUsersService();
  const [listErrors, setListErrors] = useState<Array<string>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [items, setItems] = useState<Array<{ label: string; value: string }>>(
    []
  );
  const [name, setName] = useState("");
  const inputRef = useRef<InputRef>(null);

  const handleCancelModal = () => {
    form.resetFields();
    setIsModal(false);
    setListErrors([]);
  };

  const handleSendData = async (payload: any) => {
    // try {
    //   setIsLoading(true);
    //   const resposta = await service.salvar({ ...payload, _id: entity._id });
    //   if (!resposta.sucesso) {
    //     setListErrors(resposta.errors);
    //     setIsLoading(false);
    //     return;
    //   }
    //   mutate();
    //   setIsLoading(false);
    //   handleCancelModal();
    //   setListErrors([]);
    //   message.success(
    //     entity?._id
    //       ? "Dados atualizados com sucesso!"
    //       : "Dados salvos com sucesso!"
    //   );
    //   return true;
    // } catch (ex: any) {
    //   message.error(ex || "Erro ao salvar os dados");
    //   return false;
    // }
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
          Cadastrar veículo
        </Button>
      </>
    );
  };

  const onNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const addItem = (
    e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>
  ) => {
    // e.preventDefault();
    console.log("e", e);

    // setItems([...items, name || `New item ${(e += 1)}`]);
    // setName("");
    // setTimeout(() => {
    //   inputRef.current?.focus();
    // }, 0);
  };

  // useEffect(() => {
  //   if (entity) {
  //     form.setFieldsValue({
  //       name: entity.name,
  //       surname: entity.surname,
  //       email: entity.email,
  //       cpf: entity.cpf,
  //     });
  //   }
  // }, [entity]);

  useEffect(() => {
    if (listPlate.length > 0) {
      setItems(listPlate);
    }
  }, [listPlate]);

  return (
    <Modal
      title="Cadastro de veículo"
      isOpen={isModal}
      onClose={() => handleCancelModal()}
      footer={renderButtonsFooter()}
    >
      <Form form={form} layout="vertical" name="nest-messages">
        <Select
          style={{ width: 300 }}
          placeholder="Informe a placa do veículo"
          dropdownRender={(menu) => (
            <>
              {menu}
              <Divider style={{ margin: "8px 0" }} />
              <Space style={{ padding: "0 8px 4px" }}>
                <Input
                  placeholder="Insira o nome da placa"
                  ref={inputRef}
                  value={name}
                  onChange={onNameChange}
                  onKeyDown={(e) => e.stopPropagation()}
                />
                <Button
                  type="text"
                  icon={<PlusOutlined />}
                  onClick={addItem}
                  size="small"
                >
                  Adicionar
                </Button>
              </Space>
            </>
          )}
          options={items}
        />
      </Form>
    </Modal>
  );
};

export default FormPage;
