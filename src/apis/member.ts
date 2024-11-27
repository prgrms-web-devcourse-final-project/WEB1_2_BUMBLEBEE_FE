import { authInstance } from '.';

// 사용자
interface Member {
  nickName: string;
  phoneNumber: string;
  birthDay: Date;
  sex: string;
  email: string;
  createdAt?: string;
}

// 사용자 알림
interface Alarm {}

// 로그인한 유저 정보 조회
export const getUserData = async (): Promise<Member> => {
  const response = await authInstance.get('/api/v1/member');
  return response.data;
};

// 유저 알림
export const getUserAlarm = async (): Promise<Alarm> => {
  const response = await authInstance.get('api/v1/member/notification');
  return response.data;
};

// 회원 정보 수정
export const putEditMemberInformation = async (
  data: Member,
): Promise<Member> => {
  const response = await authInstance.put('/api/v1/member', data);
  return response.data;
};

// 사용자 탈퇴
export const deleteMember = async (): Promise<void> => {
  const response = await authInstance.delete('/api/v1/member');
  return response.data;
};
