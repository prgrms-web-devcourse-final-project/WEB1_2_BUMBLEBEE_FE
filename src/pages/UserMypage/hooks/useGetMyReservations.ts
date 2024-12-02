import { getAllReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

// 모든 예약 정보 불러오기
export const useGetAllReservations = () => {
  const { data } = useQuery({
    queryKey: ['myReservationList'],
    queryFn: () => getAllReservation(),
  });
  return { data };
};

// 최근 예약 내역 한 건 불러오기
export const useGetLatestReservation = () => {
  const { data } = useGetAllReservations();
  const latestReservationData = data?.reservations[0];

  return latestReservationData;
};
