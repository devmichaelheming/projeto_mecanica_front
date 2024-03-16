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
  disableCpfOrCnpj: boolean;
}

const GeneralData: FC<GeneralDataProps> = ({
  setTypePerson,
  typePerson,
  disableCpfOrCnpj,
}): ReactElement => {
  const renderInputDocument = () => {
    return (
      <Col span={disableCpfOrCnpj ? 8 : 14}>
        <Form.Item
          name="document"
          label={typePerson === "fisica" ? "CPF" : "CNPJ"}
          rules={[{ required: true }]}
        >
          {disableCpfOrCnpj ? (
            <Input disabled />
          ) : (
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
          )}
        </Form.Item>
      </Col>
    );
  };

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
        {!disableCpfOrCnpj && (
          <Col span={10}>
            <Form.Item name="tipoDocumento" label="Tipo de pessoa" required>
              <Radio.Group
                style={{ display: "flex" }}
                optionType="button"
                id="input-tipo-documento"
                onChange={(e) => setTypePerson(e.target.value)}
                defaultValue="fisica"
              >
                <Radio.Button
                  style={{ backgroundColor: "white" }}
                  value="fisica"
                >
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
        )}

        {!disableCpfOrCnpj && renderInputDocument()}

        {typePerson === "fisica"
          ? handleRenderInputPersonFisica(disableCpfOrCnpj)
          : handleRenderInputPersonJuridica(disableCpfOrCnpj)}

        {disableCpfOrCnpj && renderInputDocument()}
      </Row>
    </>
  );
};

export default GeneralData;
