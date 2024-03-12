import {
  ClientsProps,
  VehiclesProps,
} from "~/components/Entity/Clients/models";
import useAxios from "~/lib/hooks/useAxios";
import { Response } from "~/types/Response";

type FiltroType = () => Promise<Array<ClientsProps>>;

type FiltroTypeVehicles = (id: string) => Promise<Array<VehiclesProps>>;

type RequisicaoRegistroRespostaStringType = (
  registro: ClientsProps
) => Promise<Response>;

type RequisicaoRegistroVehiclesRespostaStringType = (
  registro: VehiclesProps
) => Promise<Response>;

type RequisicaoIdRespostaStringType = (id: string) => Promise<Response>;

export interface ServicoType {
  get: FiltroType;
  post: RequisicaoRegistroRespostaStringType;
  patch: RequisicaoRegistroRespostaStringType;
  del: RequisicaoIdRespostaStringType;
  salvar: RequisicaoRegistroRespostaStringType;
  getVehicles: FiltroTypeVehicles;
  postVehicle: RequisicaoRegistroVehiclesRespostaStringType;
  patchVehicle: RequisicaoRegistroVehiclesRespostaStringType;
  salvarVehicle: RequisicaoRegistroVehiclesRespostaStringType;
}

const useClientService = (): ServicoType => {
  const api = useAxios();

  const get: FiltroType = () =>
    api
      .get<Array<ClientsProps>>("clients")
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const post: RequisicaoRegistroRespostaStringType = (registro) =>
    api
      .post<Response>("clients", registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const patch: RequisicaoRegistroRespostaStringType = (registro) =>
    api
      .patch<Response>(`clients/${registro.id}`, registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const del: RequisicaoIdRespostaStringType = (id) =>
    api
      .delete<Response>(`clients/${id}`)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const salvar: RequisicaoRegistroRespostaStringType = (registro) =>
    registro.id ? patch(registro) : post(registro);

  const getVehicles: FiltroTypeVehicles = (id: string) =>
    api
      .get<Array<VehiclesProps>>(`clients/${id}/vehicles`)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const postVehicle: RequisicaoRegistroVehiclesRespostaStringType = (
    registro
  ) =>
    api
      .post<Response>(`clients/${registro.clientId}/vehicles`, registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const patchVehicle: RequisicaoRegistroVehiclesRespostaStringType = (
    registro
  ) =>
    api
      .patch<Response>(
        `clients/${registro.clientId}/vehicles/${registro.id}`,
        registro
      )
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const salvarVehicle: RequisicaoRegistroVehiclesRespostaStringType = (
    registro
  ) => (registro.id ? patchVehicle(registro) : postVehicle(registro));

  return {
    get,
    post,
    patch,
    del,
    salvar,
    getVehicles,
    patchVehicle,
    postVehicle,
    salvarVehicle,
  };
};

export default useClientService;
