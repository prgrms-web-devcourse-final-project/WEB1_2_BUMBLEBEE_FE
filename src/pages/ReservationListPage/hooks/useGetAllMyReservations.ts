import { getAllReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';
import { Reservation } from '@typings/types';

// 모든 예약 정보 불러오기
const useGetAllMyReservations = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['myReservationList'],
    queryFn: async () => {
      let reservationData: Reservation[] = [];
      const reservationList = await getAllReservation();

      if (reservationList) {
        reservationData = reservationList.filter(
          (item) => item.state !== 'ON_HOLD' && item.state !== 'PAYMENT_FAIL',
        );
      }

      return reservationData;
    },
  });

  return { reservationList: data ?? [], isLoading };
};

export default useGetAllMyReservations;
