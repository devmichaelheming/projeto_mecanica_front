import { Col, Form, Input, Row, Switch } from "antd";
import React, { FC, ReactElement } from "react";
import InputMask from "react-input-mask";

import S from "../styles";

const Contact: FC = (): ReactElement => {
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
            rules={[{ required: true }, { max: 200 }, { type: "email" }]}
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
            <Switch />
          </Form.Item>
        </Col>
      </Row>
    </>
  );
};

export default Contact;
