import Axios, { AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { BASE_URL } from '@constants/constants';
import { getAuthToken } from '@utils/auth';

const axios = Axios.create({
  baseURL: BASE_URL,
});

const axiosWithToken = Axios.create({
  baseURL: BASE_URL,
  // 추후 추가
});

const axiosInstance: AxiosInstance = Axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<{ headers: string }>) => {
    const accessToken = getAuthToken();
    if (config.headers && accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

// response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export { axios, axiosWithToken, axiosInstance };
