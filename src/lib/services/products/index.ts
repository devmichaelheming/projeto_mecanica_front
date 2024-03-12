import { ProductProps } from "~/components/Entity/Products/models";
import useAxios from "~/lib/hooks/useAxios";

type FiltroType = () => Promise<Array<ProductProps>>;

type RequisicaoRegistroRespostaStringType = (
  registro: ProductProps
) => Promise<Response>;

type RequisicaoIdRespostaStringType = (id: string) => Promise<Response>;

export interface ServicoType {
  get: FiltroType;
  post: RequisicaoRegistroRespostaStringType;
  put: RequisicaoRegistroRespostaStringType;
  del: RequisicaoIdRespostaStringType;
  salvar: RequisicaoRegistroRespostaStringType;
}

const useProductsService = (): ServicoType => {
  const api = useAxios();

  const get: FiltroType = () =>
    api
      .get<Array<ProductProps>>("products")
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const post: RequisicaoRegistroRespostaStringType = (registro) =>
    api
      .post<Response>("products", registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const put: RequisicaoRegistroRespostaStringType = (registro) =>
    api
      .put<Response>(`products/${registro.id}`, registro)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const del: RequisicaoIdRespostaStringType = (id) =>
    api
      .delete<Response>(`products/${id}`)
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  const salvar: RequisicaoRegistroRespostaStringType = (registro) =>
    registro.id ? put(registro) : post(registro);

  return {
    get,
    post,
    put,
    del,
    salvar,
  };
};

export default useProductsService;
