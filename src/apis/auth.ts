import { removeAuthToken, setAuthToken } from '@utils/auth';
import { authInstance } from '.';

interface UserSignUpData {
  nickName: string;
  phoneNumber: string;
  sex: string;
  email: string;
  pwd: string;
  birthDay: string;
}

interface LoginData {
  email: string;
  password: string;
}

interface BusinessSignUpData {
  businessName: string;
  businessEmail: string;
  businessPwd: string;
  businessNum: string;
}

// 사용자 회원가입
export const postUserSignUp = async (user: UserSignUpData): Promise<void> => {
  await authInstance.post('/api/v1/member/siginup', user);
};

// 사용자 로그인
export const postUserLogin = async (user: LoginData): Promise<void> => {
  const response = await authInstance.post('/login/member', user);
  const { accessToken } = response.data;
  setAuthToken(accessToken);
};

// 사업자 회원가입
export const postBusinessSignUp = async (
  business: BusinessSignUpData,
): Promise<void> => {
  await authInstance.post('/api/v1/business/siginup', business);
};

// 사업자 로그인
export const postBusinessLogin = async (business: LoginData): Promise<void> => {
  const response = await authInstance.post('/login/business', business);
  const { accessToken } = response.data;
  setAuthToken(accessToken);
};

// 로그아웃
export const postLogOut = async (): Promise<void> => {
  removeAuthToken();
  await authInstance.post('/logout');
};
