import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from '@constants/constants';
import { getAuthToken, removeAuthToken, setAuthToken } from '@utils/auth';
import useAuthStore from '@store/authStore';

// Default Instance
const defaultInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
<<<<<<< HEAD
=======
  withCredentials: true,
>>>>>>> develop
});

// Auth Instance
const authInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 2000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// response interceptor (토큰 갱신)
authInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  async (error: AxiosError) => {
    // token 갱신하기
    if (error.response && error.response.status === 401) {
      try {
<<<<<<< HEAD
        const response = await authInstance.post(
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
=======
        const response = await authInstance.post('/reissue');

        if (response.status === 200) {
          const { token } = response.data;
          setAuthToken(token);

          const originalRequest = error.config as AxiosRequestConfig;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
>>>>>>> develop
          }
          return await authInstance(originalRequest); // 실패했던 요청 재시도
        }
      } catch (refreshError) {
        // 로그아웃 처리
        const { storeLogout } = useAuthStore();
<<<<<<< HEAD
        removeAuthToken();
        authInstance.post('/logout');
=======
        authInstance.post('/logout');
        removeAuthToken();
>>>>>>> develop
        storeLogout();
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

export { defaultInstance, authInstance };
