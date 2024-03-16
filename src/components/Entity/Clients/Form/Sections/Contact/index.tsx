import { Col, Form, FormInstance, Input, Row, Switch } from "antd";
import React, { FC, ReactElement, useEffect, useState } from "react";
import InputMask from "react-input-mask";

import { ClientsProps } from "../../../models";
import S from "../styles";

interface ContactProps {
  form: FormInstance<ClientsProps>;
}

const Contact: FC<ContactProps> = ({ form }): ReactElement => {
  const [whatsapppSwitch, setWhatsapppSwitch] = useState(false);

  useEffect(() => {
    form.setFieldsValue({ whatsapp: form.getFieldValue("whatsapp") });
    setWhatsapppSwitch(form.getFieldValue("whatsapp"));
  }, [form.getFieldValue("whatsapp")]);

  return (
    <>
      <S.Section>
        <h3>Contato</h3>
      </S.Section>

      <Row
        gutter={8}
        style={{
          display: "flex",
          alignItems: "end",
        }}
      >
        <Col span={12}>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[{ max: 200 }, { type: "email" }]}
          >
            <Input placeholder="Insira o e-mail do usuário" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item
            name="cellPhone"
            label="Celular"
            rules={[{ required: true }]}
          >
            <InputMask mask="(99)9.9999-9999">
              {(inputProps) => (
                <Input
                  {...inputProps}
                  id="input-cellPhone"
                  placeholder="Insira o celular do cliente"
                />
              )}
            </InputMask>
          </Form.Item>
        </Col>

        <Col span={4}>
          <Form.Item name="whatsapp" label="Whatsapp?">
            <Switch
              checked={form.getFieldValue("whatsapp")}
              onChange={(e) => {
                setWhatsapppSwitch(e);
                form.setFieldsValue({ whatsapp: e ? true : false });
              }}
            />

            <span
              style={{
                paddingLeft: "6px",
                fontWeight: 500,
              }}
            >
              {whatsapppSwitch ? "Sim" : "Não"}
            </span>
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Contact;
