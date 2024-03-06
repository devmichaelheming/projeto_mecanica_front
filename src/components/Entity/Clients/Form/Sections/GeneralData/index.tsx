import { Col, Form, Input, Radio, Row } from "antd";
import React, { Dispatch, FC, ReactElement, SetStateAction } from "react";
import InputMask from "react-input-mask";

import {
  handleRenderInputPersonFisica,
  handleRenderInputPersonJuridica,
} from "../../_regras";
import S from "../styles";

interface GeneralDataProps {
  typePerson: "fisica" | "juridica";
  setTypePerson: Dispatch<SetStateAction<"fisica" | "juridica">>;
}

const GeneralData: FC<GeneralDataProps> = ({
  setTypePerson,
  typePerson,
}): ReactElement => {
  return (
    <>
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
        <Col span={10}>
          <Form.Item name="tipoDocumento" label="Tipo de pessoa" required>
            <Radio.Group
              style={{ display: "flex" }}
              optionType="button"
              id="input-tipo-documento"
              onChange={(e) => setTypePerson(e.target.value)}
              defaultValue="fisica"
            >
              <Radio.Button style={{ backgroundColor: "white" }} value="fisica">
                Pessoa física
              </Radio.Button>
              <Radio.Button
                style={{ backgroundColor: "white" }}
                value="juridica"
              >
                Pessoa jurídica
              </Radio.Button>
            </Radio.Group>
          </Form.Item>
        </Col>

        <Col span={14}>
          <Form.Item
            name={typePerson === "fisica" ? "cpf" : "cnpj"}
            label={typePerson === "fisica" ? "CPF" : "CNPJ"}
            rules={[{ required: true }]}
          >
            <InputMask
              mask={
                typePerson === "fisica"
                  ? "999.999.999-99"
                  : "99.999.999/9999-99"
              }
            >
              {(inputProps) => (
                <Input
                  {...inputProps}
                  id={
                    typePerson === "fisica"
                      ? "input-documento-cpf"
                      : "input-documento-cnpj"
                  }
                  placeholder={
                    typePerson === "fisica"
                      ? "Insira o seu CPF"
                      : "Insira o seu CNPJ"
                  }
                />
              )}
            </InputMask>
          </Form.Item>
        </Col>
      </Row>

      <Row
        gutter={8}
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        {typePerson === "fisica"
          ? handleRenderInputPersonFisica()
          : handleRenderInputPersonJuridica()}
      </Row>
    </>
  );
};

export default GeneralData;
