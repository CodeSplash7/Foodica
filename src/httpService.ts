import axios, { AxiosRequestConfig, AxiosResponse, AxiosError } from "axios";

const baseURL = "http://localhost:3000";

const instance = axios.create({
  baseURL,
  timeout: 10000
});

interface CustomAxiosRequestConfig extends AxiosRequestConfig {
  // ...
}

interface CustomAxiosResponse<T = any> extends AxiosResponse<T> {
  // ...
}

interface CustomAxiosError<T = any> extends AxiosError<T> {
  // ...
}

export const get = async <T = any>(
  url: string,
  config?: CustomAxiosRequestConfig
): Promise<CustomAxiosResponse<T>> => {
  try {
    const response = await instance.get<T>(url, config);
    return response;
  } catch (error) {
    throw error as CustomAxiosError;
  }
};

export const post = async <T = any>(
  url: string,
  data?: any,
  config?: CustomAxiosRequestConfig
): Promise<CustomAxiosResponse<T>> => {
  try {
    const response = await instance.post<T>(url, data, config);
    return response;
  } catch (error) {
    throw error as CustomAxiosError;
  }
};

export default {
  get,
  post
};
