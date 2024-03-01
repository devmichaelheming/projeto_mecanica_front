import { Col, Form, Input, Radio, Row, Select } from "antd";
import React, { FC, ReactElement } from "react";
import InputMask from "react-input-mask";

import { ufList } from "../../_funcoes";
import S from "../styles";

interface AddressProps {
  handleGetCities: (city: string) => void;
  listCities: Array<{ label: string; value: string }>;
  isLoadingGetCities: boolean;
}

const Address: FC<AddressProps> = ({
  handleGetCities,
  listCities,
  isLoadingGetCities,
}): ReactElement => {
  return (
    <>
      <S.Section>
        <h3>Endereço</h3>
      </S.Section>
      <Row
        gutter={8}
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Col span={12}>
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
