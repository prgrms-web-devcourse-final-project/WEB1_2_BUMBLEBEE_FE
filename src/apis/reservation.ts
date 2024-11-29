import { GetAllReservationData, PostReservationData } from '@typings/types';
import { authInstance } from '.';

// 예약 등록
export const postReservation = async (
  reservation: PostReservationData,
): Promise<void> => {
  const response = await authInstance.post('/api/v1/reservations', reservation);
  return response.data;
};

// 사용자의 최근 예약 전체 조회
export const getAllReservation = async (): Promise<GetAllReservationData> => {
  const response = await authInstance.get(`/api/v1/reservations/member`);
  return response.data;
};

// 사업자의 예약자 조회
