import { Button } from "antd";
import React, { FC, ReactElement, useState } from "react";

import S from "../styles";
import FormVehicle from "./FormVehicle";
import TableVehicle from "./TableVehicle";

const Vehicle: FC = (): ReactElement => {
  const [isModal, setIsModal] = useState(false);

  const handleDelelete = (registro: any) => {
    console.log("teste");
  };

  const handleEdit = (registro: any) => {
    console.log("teste");
  };

  return (
    <>
      <S.Section
        style={{
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <h3>Veículos</h3>

        <Button type="primary" onClick={() => setIsModal(true)}>
          Adicionar veículo
        </Button>
      </S.Section>

      <TableVehicle
        data={[]}
        onEditar={handleEdit}
        onExcluir={handleDelelete}
      />

      <FormVehicle isModal={isModal} setIsModal={setIsModal} />
    </>
  );
};

export default Vehicle;
