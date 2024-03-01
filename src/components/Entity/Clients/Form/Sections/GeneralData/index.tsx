import { Form, Radio, Row } from "antd";
import React, { Dispatch, FC, ReactElement, SetStateAction } from "react";

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

      <Form.Item name="tipoDocumento" label="Tipo de pessoa" required>
        <Radio.Group
          style={{ display: "flex" }}
          optionType="button"
          id="input-tipo-documento"
          onChange={(e) => setTypePerson(e.target.value)}
          defaultValue={typePerson}
        >
          <Radio.Button style={{ backgroundColor: "white" }} value="fisica">
            Pessoa física
          </Radio.Button>
          <Radio.Button style={{ backgroundColor: "white" }} value="juridica">
            Pessoa jurídica
          </Radio.Button>
        </Radio.Group>
      </Form.Item>

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
