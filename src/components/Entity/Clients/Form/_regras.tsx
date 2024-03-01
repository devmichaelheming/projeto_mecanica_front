import { Col, Form, Input } from "antd";

export const handleRenderInputPersonFisica = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="name"
          label="Nome"
          rules={[{ required: true }, { max: 100 }, { min: 3 }]}
        >
          <Input placeholder="Insira o nome do usuário" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="surname"
          label="Sobrenome"
          rules={[
            {
              required: true,
            },
            { max: 100 },
            { min: 3 },
          ]}
        >
          <Input placeholder="Insira o sobrenome do usuário" />
        </Form.Item>
      </Col>
    </>
  );
};

export const handleRenderInputPersonJuridica = () => {
  return (
    <>
      <Col span={12}>
        <Form.Item
          name="razaoSocial"
          label="Razão social"
          rules={[{ required: true }, { max: 100 }, { min: 3 }]}
        >
          <Input placeholder="Insira a razão social" />
        </Form.Item>
      </Col>

      <Col span={12}>
        <Form.Item
          name="nomeFantasia"
          label="Nome fantasia"
          rules={[
            {
              required: true,
            },
            { max: 100 },
            { min: 3 },
          ]}
        >
          <Input placeholder="Insira o nome fantasia" />
        </Form.Item>
      </Col>
    </>
  );
};
