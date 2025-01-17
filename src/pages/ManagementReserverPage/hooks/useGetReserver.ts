import { getAllReserver } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';
import { ReserverInfo } from '@typings/types';

const useGetReserver = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['reserver'],
    queryFn: async () => {
      let reserverData: ReserverInfo[] = [];
      const reserverList = await getAllReserver();

      if (reserverList) {
        reserverData = reserverList.filter(
          (item) =>
            item.reservationState !== 'ON_HOLD' &&
            item.reservationState !== 'PAYMENT_FAIL',
        );
      }

      return reserverData;
    },
  });
  return { reserverList: data ?? [], isLoading };
};

export default useGetReserver;
