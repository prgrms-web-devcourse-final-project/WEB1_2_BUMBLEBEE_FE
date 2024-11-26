import { defaultInstance } from '.';

interface LoginData {
  email: string;
  password: string;
}

export const postLogin = async (user: LoginData) => {
  const response = await defaultInstance.post(`/api/v1/member/login`, user);
  return response.data;
};

export default postLogin;
