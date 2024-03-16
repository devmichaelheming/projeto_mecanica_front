import {
  ClientsProps,
  VehiclesProps,
} from "~/components/Entity/Clients/models";
import Modal from "~/components/Modal";
import useClientsService from "~/lib/services/clients";
import {
  Button,
  Form,
  Input,
  Row,
  Col,
  DatePicker,
  Modal as ModalAntd,
  message,
} from "antd";
import dayjs from "dayjs";
import _ from "lodash";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import InputMask from "react-input-mask";
import { v4 as uuidv4 } from "uuid";
interface FormProps {
  isModal: boolean;
  setIsModal: Dispatch<SetStateAction<boolean>>;
  listVehicles: Array<VehiclesProps>;
  setListVehicles: Dispatch<SetStateAction<Array<VehiclesProps>>>;
  entity: ClientsProps;
  entityVehicle: VehiclesProps;
  setEntityVehicle: Dispatch<SetStateAction<VehiclesProps>>;
  mutate: () => void;
}

const FormPage: FC<FormProps> = ({
  isModal,
  setIsModal,
  listVehicles,
  setListVehicles,
  entity,
  entityVehicle,
  setEntityVehicle,
  mutate,
}): ReactElement => {
  const [form] = Form.useForm();
  const service = useClientsService();
  const [isLoading, setIsLoading] = useState(false);

  const handleCancelModal = () => {
    form.resetFields();
    setIsModal(false);
    setEntityVehicle(null);
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

  const handleSendData = async (payload: VehiclesProps) => {
    if (_.isEmpty(entity)) {
      const index = listVehicles.findIndex(
        (vehicle) => vehicle.brand === entityVehicle?.brand
      );

      if (index < 0) {
        const newVehicle = {
          id: uuidv4(),
          ...payload,
        };

        const newListVehicles = [...listVehicles, newVehicle];

        setListVehicles(newListVehicles);
        handleCancelModal();
        return;
      } else {
        const temp = [...listVehicles];

        temp.splice(index, 1, { id: entityVehicle.id, ...payload });

        setListVehicles(temp);
        handleCancelModal();
      }
    } else {
      try {
        const resposta = await service.salvarVehicle({
          ...payload,
          id: entityVehicle.id,
          clientId: entity.id,
        });

        if (!resposta.sucesso) {
          setIsLoading(false);
          return;
        }

        handleCancelModal();
        mutate();
        message.success(
          entityVehicle?.id
            ? "Veículo atualizado com sucesso!"
            : "Veículo cadastrado com sucesso!"
        );
      } catch (error) {
        message.error(error || "Erro ao salvar os dados");
      }
    }
  };

  const handleSubmit = () => {
    form.validateFields().then((values) => {
      handleSendData({
        ...values,
        yearManufacture: values.yearManufacture.year().toString(),
      });
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
          onClick={() => handleSubmit()}
          loading={isLoading}
        >
          {entityVehicle?.id ? "Atualizar veículo" : " Cadastrar veículo"}
        </Button>
      </>
    );
  };

  useEffect(() => {
    if (entityVehicle?.id) {
      form.setFieldsValue({
        ...entityVehicle,
        yearManufacture: dayjs(entityVehicle.yearManufacture, "YYYY"),
      });
    }
  }, [entityVehicle]);

  return (
    <Modal
      title="Cadastro de veículo"
      isOpen={isModal}
      onClose={() => handleConfirmCancelModal()}
      footer={renderButtonsFooter()}
    >
      <Form form={form} layout="vertical" name="nest-messages">
        <Row gutter={8}>
          <Col span={8}>
            <Form.Item name="brand" label="Marca" rules={[{ required: true }]}>
              <Input placeholder="Insira a marca" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item name="model" label="Modelo" rules={[{ required: true }]}>
              <Input placeholder="Insira o modelo" />
            </Form.Item>
          </Col>

          <Col span={8}>
            <Form.Item
              name="yearManufacture"
              label="Ano de fabricação"
              rules={[{ required: true }]}
            >
              <DatePicker
                picker="year"
                style={{ width: "100%" }}
                placeholder="Selecione o ano"
              />
            </Form.Item>
          </Col>
        </Row>

        <Row gutter={8}>
          <Col span={12}>
            <Form.Item name="color" label="Cor" rules={[{ required: true }]}>
              <Input placeholder="Insira a cor" />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item name="plate" label="Placa" rules={[{ required: true }]}>
              <InputMask mask="aaa-9999">
                {(inputProps) => (
                  <Input
                    {...inputProps}
                    id="input-plate"
                    placeholder="Insira a placa"
                  />
                )}
              </InputMask>
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="chassisNumber"
              label="Número do Chassi"
              rules={[{ min: 17 }]}
            >
              <Input placeholder="Insira o número do chassi" maxLength={17} />
            </Form.Item>
          </Col>

          <Col span={12}>
            <Form.Item
              name="engineNumber"
              label="Número do motor"
              rules={[{ min: 6 }]}
            >
              <Input placeholder="Insira o número do motor" maxLength={6} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormPage;
