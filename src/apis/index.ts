import axios, {
  AxiosError,
  AxiosInstance,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from '@constants/constants';
import { getAuthToken } from '@utils/auth';

// Default Instance
const defaultInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// Auth Instance
const authInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
});

// request interceptor
authInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
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
const responseInterceptor = (response: AxiosResponse) => response;

// error handling
const onError = (message: string): never => {
  throw new Error(message);
};

const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    const { status } = error.response;

    switch (status) {
      case 400:
        onError('400 에러');
        break;
      case 401: {
        onError('401 에러');
        break;
      }
      case 403: {
        onError('403 에러');
        break;
      }
      default: {
        onError(`에러가 발생했습니다. ${error.message}`);
      }
    }
  }

  return Promise.reject(error);
};

defaultInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor,
);
authInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export { defaultInstance, authInstance };
