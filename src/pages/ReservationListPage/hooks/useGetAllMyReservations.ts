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

export const useGetAllMyReservations = () => {
  const { data } = useGetAllReservations();
  const reservations = data ? data.reservations : [];

  return reservations;
};
