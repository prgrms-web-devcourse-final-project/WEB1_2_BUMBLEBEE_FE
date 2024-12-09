import { getAllReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

// 모든 예약 정보 불러오기
const useGetAllMyReservations = () => {
  const { data } = useQuery({
    queryKey: ['myReservationList'],
    queryFn: async () => {
      const reservationList = await getAllReservation();
      const filteredReservation = reservationList.filter(
        (item) => item.state !== 'ON_HOLD' && item.state !== 'PAYMENT_FAIL',
      );

      console.log(reservationList);

      return filteredReservation;
    },
  });

  return { reservationList: data ?? [] };
};

export default useGetAllMyReservations;
