import { defaultInstance } from '.';

interface LoginData {
  email: string;
  password: string;
}

const postLogin = (loginData: LoginData) => {
  return defaultInstance.post(`/api/v1/member/login`, loginData);
};

export default postLogin;
