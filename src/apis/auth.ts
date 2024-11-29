import { removeAuthToken, setAuthToken } from '@utils/auth';
import { BusinessSignUpData, LoginData, UserSignUpData } from '@typings/types';
<<<<<<< HEAD
import { authInstance } from '.';

// 사용자 회원가입
export const postUserSignUp = async (user: UserSignUpData): Promise<void> => {
  await authInstance.post('/api/v1/member/siginup', user);
=======
import { authInstance, defaultInstance } from '.';

// 사용자 회원가입
export const postUserSignUp = async (user: UserSignUpData): Promise<void> => {
  await defaultInstance.post('/api/v1/member/signup', user);
>>>>>>> develop
};

// 사용자 로그인
export const postUserLogin = async (user: LoginData): Promise<void> => {
<<<<<<< HEAD
  const response = await authInstance.post('/login/member', user);
  const { accessToken } = response.data;
  setAuthToken(accessToken);
=======
  const response = await defaultInstance.post('/login/member', user, {
    withCredentials: true,
  });
  const { token } = response.data;
  setAuthToken(token);
>>>>>>> develop
};

// 사업자 회원가입
export const postBusinessSignUp = async (
  business: BusinessSignUpData,
): Promise<void> => {
<<<<<<< HEAD
  await authInstance.post('/api/v1/business/siginup', business);
=======
  await defaultInstance.post('/api/v1/business/signup', business);
>>>>>>> develop
};

// 사업자 로그인
export const postBusinessLogin = async (business: LoginData): Promise<void> => {
<<<<<<< HEAD
  const response = await authInstance.post('/login/business', business);
  const { accessToken } = response.data;
  setAuthToken(accessToken);
=======
  const response = await defaultInstance.post('/login/business', business, {
    withCredentials: true,
  });
  const { token } = response.data;
  setAuthToken(token);
>>>>>>> develop
};

// 로그아웃
export const postLogOut = async (): Promise<void> => {
<<<<<<< HEAD
  removeAuthToken();
  await authInstance.post('/logout');
=======
  await authInstance.post('/logout');
  removeAuthToken();
>>>>>>> develop
};
