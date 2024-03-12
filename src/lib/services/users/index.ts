import { UsersProps } from "~/components/Entity/Users/models";
import useAxios from "~/lib/hooks/useAxios";
import { Response } from "~/types/Response";

type FiltroType = () => Promise<Array<UsersProps>>;

type RequisicaoRegistroRespostaStringType = (
  registro: UsersProps
) => Promise<Response>;

type RequisicaoIdRespostaStringType = (id: string) => Promise<Response>;

export interface ServicoType {
  get: FiltroType;
  post: RequisicaoRegistroRespostaStringType;
  patch: RequisicaoRegistroRespostaStringType;
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

  const patch: RequisicaoRegistroRespostaStringType = (registro) =>
    api
      .patch<Response>(`users/${registro.id}`, registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const del: RequisicaoIdRespostaStringType = (id) =>
    api
      .delete<Response>(`users/${id}`)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const salvar: RequisicaoRegistroRespostaStringType = (registro) =>
    registro.id ? patch(registro) : post(registro);

  return {
    get,
    post,
    patch,
    del,
    salvar,
  };
};

export default useUsersService;
