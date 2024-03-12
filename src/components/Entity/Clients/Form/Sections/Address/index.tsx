import { LoadingOutlined, SearchOutlined } from "@ant-design/icons";
import { removeSpecialCharacters } from "~/lib/utils/_funcoes";
import { Col, Form, Input, message, Row, Select, Spin, Tooltip } from "antd";
import axios from "axios";
import { FormInstance } from "rc-field-form";
import React, { FC, ReactElement, useState } from "react";
import InputMask from "react-input-mask";

import { ufList } from "../../_funcoes";
import { ClientsProps } from "../../../models";
import { Section } from "../styles";
import S from "./styles";

interface AddressProps {
  form: FormInstance<ClientsProps>;
}

const Address: FC<AddressProps> = ({ form }): ReactElement => {
  const [isLoadingGetCities, setIsLoadingGetCities] = useState(false);
  const [isLoadingGetCep, setIsLoadingGetCep] = useState(false);
  const [listCities, setListCities] = useState<
    Array<{ label: string; value: string }>
  >([]);

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

  const handleGetAddress = async () => {
    const cep = form.getFieldValue("cep");

    if (cep && cep.length === 9) {
      setIsLoadingGetCep(true);

      try {
        const response = await axios.get(
          `https://viacep.com.br/ws/${cep}/json/`
        );

        const address = response.data || [];

        if (address.erro) {
          message.error("CEP não encontrado, tenta novamente!");
          setIsLoadingGetCep(false);
          return;
        }

        form.setFieldsValue({
          rua: address.logradouro,
          bairro: address.bairro,
          estado: address.uf,
          cidade: address.localidade,
        });

        setIsLoadingGetCep(false);
      } catch (error) {
        message.error(
          "Ocorreu um erro ao processar a sua solicitação. Por favor, tente novamente mais tarde."
        );

        setIsLoadingGetCep(false);
        throw error;
      }
    }
  };

  return (
    <>
      <Section>
        <h3>Endereço</h3>
      </Section>
      <Row
        gutter={8}
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Col span={10}>
          <Form.Item name="cep" label="CEP" rules={[{ required: true }]}>
            <InputMask mask="99999-999">
              {(inputProps) => (
                <Input
                  {...inputProps}
                  id="input-cellPhone"
                  placeholder="Insira o seu cep"
                />
              )}
            </InputMask>
          </Form.Item>
        </Col>

        <Col span={2}>
          <div
            style={{ display: "flex", height: "80px", alignItems: "center" }}
          >
            <Tooltip title="BUSCAR CEP">
              <S.ButtonCep
                type="button"
                onClick={() => handleGetAddress()}
                disabled={isLoadingGetCep}
              >
                {isLoadingGetCep ? (
                  <Spin
                    indicator={<LoadingOutlined />}
                    style={{ fontSize: 8 }}
                    spinning
                  />
                ) : (
                  <SearchOutlined />
                )}
              </S.ButtonCep>
            </Tooltip>
          </div>
        </Col>

        <Col span={12}>
          <Form.Item name="rua" label="Rua" rules={[{ required: true }]}>
            <Input placeholder="Insira a sua rua" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="numero" label="Número" rules={[{ required: true }]}>
            <Input placeholder="Insira a sua rua" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item name="bairro" label="Bairro" rules={[{ required: true }]}>
            <Input placeholder="Insira o seu bairro" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="estado"
            label="Estado"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              id="input-uf"
              allowClear
              showSearch
              placeholder="Selecione o estado"
              onSelect={(e) => handleGetCities(e)}
              options={ufList}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item
            name="cidade"
            label="Cidade"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              id="input-city"
              allowClear
              showSearch
              placeholder="Selecione a sua cidade"
              options={listCities}
              loading={isLoadingGetCities}
              disabled={isLoadingGetCities}
            />
          </Form.Item>
        </Col>
      </Row>{" "}
    </>
  );
};

export default Address;
