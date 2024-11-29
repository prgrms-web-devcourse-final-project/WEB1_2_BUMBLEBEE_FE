import { removeAuthToken, setAuthToken } from '@utils/auth';
import { BusinessSignUpData, LoginData, UserSignUpData } from '@typings/types';
import { authInstance, defaultInstance } from '.';

// 사용자 회원가입
export const postUserSignUp = async (user: UserSignUpData): Promise<void> => {
  await defaultInstance.post('/api/v1/member/signup', user);
};

// 사용자 로그인
export const postUserLogin = async (user: LoginData): Promise<void> => {
  const response = await defaultInstance.post('/login/member', user, {
    withCredentials: true,
  });
  const { token } = response.data;
  setAuthToken(token);
};

// 사업자 회원가입
export const postBusinessSignUp = async (
  business: BusinessSignUpData,
): Promise<void> => {
  await defaultInstance.post('/api/v1/business/signup', business);
};

// 사업자 로그인
export const postBusinessLogin = async (business: LoginData): Promise<void> => {
  const response = await defaultInstance.post('/login/business', business, {
    withCredentials: true,
  });
  const { token } = response.data;
  setAuthToken(token);
};

// 로그아웃
export const postLogOut = async (): Promise<void> => {
  await authInstance.post('/logout');
  removeAuthToken();
};
