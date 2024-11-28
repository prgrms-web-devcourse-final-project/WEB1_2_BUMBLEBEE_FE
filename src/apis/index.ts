import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from '@constants/constants';
import { getAuthToken, removeAuthToken, setAuthToken } from '@utils/auth';

// Default Instance
const defaultInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
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

// 회원가입 & 로그인 용
const tokenInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// response interceptor (토큰 갱신)
tokenInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // token 갱신하기
    if (error.response && error.response.status === 401) {
      try {
        const response = await tokenInstance.post(
          '/reissue',
          {},
          { withCredentials: true },
        );

        if (response.status === 200) {
          const { accessToken } = response.data;
          setAuthToken(accessToken);

          const originalRequest = error.config as AxiosRequestConfig;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          }
          return await tokenInstance(originalRequest); // 실패했던 요청 재시도
        }
      } catch (refreshError) {
        // 로그아웃 처리
        removeAuthToken();
        tokenInstance.post('/logout');
        window.location.replace('/');
      }
    }
    return Promise.reject(error);
  },
);

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

export { defaultInstance, authInstance, tokenInstance };
