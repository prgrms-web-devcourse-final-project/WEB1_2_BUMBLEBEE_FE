import { getAllReserver } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

const useGetReserver = () => {
  const { data } = useQuery({
    queryKey: ['reserver'],
    queryFn: async () => {
      const reserverList = await getAllReserver();
      const filteredReserverList = reserverList.filter(
        (item) =>
          item.reservationState !== 'ON_HOLD' &&
          item.reservationState !== 'PAYMENT_FAIL',
      );

      return filteredReserverList;
    },
  });
  return { reserverList: data ?? [] };
};

export default useGetReserver;
