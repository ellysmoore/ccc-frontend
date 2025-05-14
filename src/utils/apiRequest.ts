import { AXIOS } from '@/configs';
import { AxiosRequestConfig, AxiosResponse } from 'axios';

export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// eslint-disable-next-line
export const apiRequest = async <T = any>({
  url,
  method = 'GET',
  headers = {},
  params,
  data,
  responseType,
  ...restConfig
}: ApiRequestProps): Promise<T> => {
  const config: AxiosRequestConfig = {
    method,
    url: url.match(/^https?:\/\//) ? url : `${API_BASE_URL}${url}`,
    headers,
    params,
    data,
    responseType,
    ...restConfig,
  };

  try {
    const response: AxiosResponse<T> = await AXIOS(config);
    return response?.data;
    // eslint-disable-next-line
  } catch (error: any) {
    console.error('API Request Error:', error);
    throw error?.response?.data || error;
  }
};

export interface ApiRequestProps
  extends Omit<AxiosRequestConfig, 'url' | 'method' | 'responseType'> {
  url: string;
  method?: 'POST' | 'GET' | 'PATCH' | 'DELETE' | 'PUT';
  responseType?: 'json' | 'blob';
}
