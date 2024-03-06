import { ClientsProps } from "~/components/Entity/Clients/models";
import useAxios from "~/lib/hooks/useAxios";
import { Response } from "~/types/Response";

type FiltroType = () => Promise<Array<ClientsProps>>;

type RequisicaoRegistroRespostaStringType = (
  registro: ClientsProps
) => Promise<Response>;

type RequisicaoIdRespostaStringType = (id: string) => Promise<Response>;

export interface ServicoType {
  get: FiltroType;
  post: RequisicaoRegistroRespostaStringType;
  patch: RequisicaoRegistroRespostaStringType;
  del: RequisicaoIdRespostaStringType;
  salvar: RequisicaoRegistroRespostaStringType;
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
      .patch<Response>(`clients/${registro._id}`, registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const del: RequisicaoIdRespostaStringType = (id) =>
    api
      .delete<Response>(`clients/${id}`)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const salvar: RequisicaoRegistroRespostaStringType = (registro) =>
    registro._id ? patch(registro) : post(registro);

  return {
    get,
    post,
    patch,
    del,
    salvar,
  };
};

export default useClientService;
