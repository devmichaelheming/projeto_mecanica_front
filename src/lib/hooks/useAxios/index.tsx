import axios from "axios";
import type { AxiosError, AxiosInstance, AxiosResponse } from "axios";

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

function useAxios(): AxiosInstance {
  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API,
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
  });

  api.interceptors.response.use(onResponse, onResponseError);

  return api;
}

export default useAxios;
