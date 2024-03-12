import useClientService from "~/lib/services/clients";
import { Button } from "antd";
import _ from "lodash";
import React, {
  Dispatch,
  FC,
  ReactElement,
  SetStateAction,
  useEffect,
  useState,
} from "react";
import useSWR from "swr";

import { ClientsProps, VehiclesProps } from "../../../models";
import S from "../styles";
import FormVehicle from "./FormVehicle";
import TableVehicle from "./TableVehicle";

interface VehicleComponentProps {
  entity: ClientsProps;
  listVehicles: Array<VehiclesProps>;
  setListVehicles: Dispatch<SetStateAction<Array<VehiclesProps>>>;
}

const Vehicle: FC<VehicleComponentProps> = ({
  entity,
  listVehicles,
  setListVehicles,
}): ReactElement => {
  const service = useClientService();
  const [isModal, setIsModal] = useState(false);
  const [entityVehicle, setEntityVehicle] = useState<VehiclesProps>(
    {} as VehiclesProps
  );

  const idClient = entity?.id;

  const { data, mutate } = useSWR(
    idClient ? `clients/${idClient}/vehicles` : null,
    async () => (idClient ? service.getVehicles(entity.id) : null)
  );

  const getListVehicles: VehiclesProps[] = data || listVehicles;

  const handleDelelete = (registro: VehiclesProps) => {
    if (_.isEmpty(entity)) {
      const vehicleFiltered = listVehicles
        .filter((item) => item.id !== registro.id)
        .map((item) => item);

      setListVehicles(vehicleFiltered);
    }
  };

  const handleEdit = (registro: VehiclesProps) => {
    setIsModal(true);
    setEntityVehicle(registro);
  };

  useEffect(() => {
    if (!_.isEmpty(entity) && entity.vehicles.length > 0) {
      const vehicles = entity.vehicles;

      setListVehicles(vehicles);
    }
  }, [entity]);

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
        data={getListVehicles}
        onEditar={handleEdit}
        onExcluir={handleDelelete}
      />

      <FormVehicle
        isModal={isModal}
        setIsModal={setIsModal}
        listVehicles={listVehicles}
        setListVehicles={setListVehicles}
        entity={entity}
        entityVehicle={entityVehicle}
        setEntityVehicle={setEntityVehicle}
        mutate={mutate}
      />
    </>
  );
};

export default Vehicle;
