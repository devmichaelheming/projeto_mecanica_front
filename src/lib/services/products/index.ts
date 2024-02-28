import useAxios from "~/lib/hooks/useAxios";
import { Response } from "~/types/response";

type FiltroType = () => Promise<Response>;

export interface ServicoType {
  get: FiltroType;
}

const useProductsService = (): ServicoType => {
  const api = useAxios();

  const get: FiltroType = () =>
    api
      .get<Response>("products")
      .then((response) => response.data)
      .catch((error) => ({ ...error?.response?.data, sucesso: false }));

  return {
    get,
  };
};

export default useProductsService;
