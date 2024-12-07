import { Business, BusinessAlarm } from '@typings/types';
import { authInstance } from '.';

// 사업자 정보 조회
export const getBusinessData = async (): Promise<Business> => {
  const response = await authInstance.get('/api/v1/business');
  return response.data;
};

// 사업자 알림
export const getBusinessAlarm = async (): Promise<BusinessAlarm> => {
  const response = await authInstance.get('/api/v1/notification/business');
  return response.data;
};

// 사업자 정보 수정
export const putEditBusinessInformation = async (
  data: Business,
): Promise<void> => {
  await authInstance.put('/api/v1/business', data);
};

// 사업자 탈퇴
export const deleteBusiness = async (): Promise<void> => {
  await authInstance.delete('/api/v1/business');
};
