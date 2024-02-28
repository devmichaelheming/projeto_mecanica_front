import { UsersProps } from "~/components/Entity/Users/models";
import useAxios from "~/lib/hooks/useAxios";
import { Response } from "~/types/response";

type FiltroType = () => Promise<Array<UsersProps>>;

type RequisicaoRegistroRespostaStringType = (
  registro: UsersProps
) => Promise<Response>;

type RequisicaoIdRespostaStringType = (id: string) => Promise<Response>;

export interface ServicoType {
  get: FiltroType;
  post: RequisicaoRegistroRespostaStringType;
  put: RequisicaoRegistroRespostaStringType;
  del: RequisicaoIdRespostaStringType;
  salvar: RequisicaoRegistroRespostaStringType;
}

const useUsersService = (): ServicoType => {
  const api = useAxios();

  const get: FiltroType = () =>
    api
      .get<Array<UsersProps>>("users")
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const post: RequisicaoRegistroRespostaStringType = (registro) =>
    api
      .post<Response>("users", registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const put: RequisicaoRegistroRespostaStringType = (registro) =>
    api
      .put<Response>(`users/${registro._id}`, registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const del: RequisicaoIdRespostaStringType = (id) =>
    api
      .delete<Response>(`users/${id}`)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const salvar: RequisicaoRegistroRespostaStringType = (registro) =>
    registro._id ? put(registro) : post(registro);

  return {
    get,
    post,
    put,
    del,
    salvar,
  };
};

export default useUsersService;
