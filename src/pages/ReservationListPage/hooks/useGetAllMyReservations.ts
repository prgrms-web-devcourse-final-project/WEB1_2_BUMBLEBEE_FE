import { getAllReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

// 모든 예약 정보 불러오기
const useGetAllMyReservations = () => {
  const { data } = useQuery({
    queryKey: ['myReservationList'],
    queryFn: () => getAllReservation(),
  });

  return { reservationList: data ?? [] };
};

export default useGetAllMyReservations;
