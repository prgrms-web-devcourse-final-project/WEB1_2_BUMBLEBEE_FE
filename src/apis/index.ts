import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import { BASE_URL } from '@constants/constants';
import {
  getAuthToken,
  removeAuthToken,
  removeRole,
  setAuthToken,
} from '@utils/auth';
import { toast } from 'react-toastify';

// Default Instance
const defaultInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

// Auth Instance
const authInstance: AxiosInstance = axios.create({
  baseURL: BASE_URL,
  timeout: 5000,
  headers: {
    accept: 'application/json',
    'Content-Type': 'application/json',
  },
  withCredentials: true,
});

/*
  AccessToken 만료 시
  토큰 재발급 요청(reissue) -> 
  서버에서 refreshToken 검사 -> 
  올바른 토큰이면 AccessToken 재발급 , 그렇지 않은 토큰이면 로그아웃 상태로 변경
*/

// response interceptor (토큰 갱신)
authInstance.interceptors.response.use(
  (response: AxiosResponse) => response,
  // 에러 처리 함수
  async (error: AxiosError) => {
    // 401 Unauthorized 에러 시 token 갱신하기
    if (error.response && error.response.status === 401) {
      try {
        const response = await defaultInstance.post('/reissue');

        // reissue 요청 성공 시
        if (response.status === 200) {
          const token = response.headers.authorization;
          setAuthToken(token);

          const originalRequest = error.config as AxiosRequestConfig;
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          return await authInstance(originalRequest); // 실패했던 요청 재시도
        }
      } catch (refreshError) {
        // reissue 요청 실패 시
        const reissueError = refreshError as AxiosError;
        if (reissueError.response?.status === 401) {
          // 로그아웃
          removeAuthToken();
          removeRole();
          window.location.replace('/start');
        }
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
export const onError = (message: string): void => {
  toast.error(message);
};

const errorInterceptor = (error: AxiosError) => {
  if (error.response) {
    const { message, code } = error.response.data as {
      code: string;
      message: string;
    };
    if (
      // 특정 코드(B004, B005, B006)에서는 toast를 띄우지 않음
      error.response.status === 401 ||
      (error.response.status === 409 && ['B004', 'B005', 'B006'].includes(code))
    ) {
      return Promise.reject(error);
    }

    onError(message || '요청 처리 중 오류가 발생했습니다.');
  }

  if (!error.response) {
    onError('네트워크 연결을 확인해주세요.');
  }

  return Promise.reject(error);
};

defaultInstance.interceptors.response.use(
  responseInterceptor,
  errorInterceptor,
);
authInstance.interceptors.response.use(responseInterceptor, errorInterceptor);

export { defaultInstance, authInstance };
