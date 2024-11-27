import { authInstance } from '.';

interface PostReservationData {
  reservationName: string;
  reservationPhoneNumber: string;
  startTime: Date;
  endTime: Date;
}

interface GetAllReservation {
  workplaceName: string;
  reservationCreatedAt: Date;
  startTime: Date;
  endTime: Date;
  studyRoomCapacity: number;
  price: number;
  studyRoomUrl: string;
}

interface GetAllReservationData {
  reservations: GetAllReservation[];
}

// 예약 등록
export const postReservation = async (
  reservation: PostReservationData,
): Promise<void> => {
  const response = await authInstance.post('api/v1/reservations', reservation);
  return response.data;
};

// 사용자의 최근 예약 전체 조회
export const getAllReservation = async (
  memberId: number,
): Promise<GetAllReservationData> => {
  const response = await authInstance.get(
    `api/v1/reservations/member/${memberId}`,
  );
  return response.data;
};

// 사업자의 예약자 조회
