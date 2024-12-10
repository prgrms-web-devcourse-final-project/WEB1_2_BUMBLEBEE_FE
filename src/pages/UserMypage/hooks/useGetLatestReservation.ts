import { getLatestReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

const useGetLatestReservation = () => {
  const { data } = useQuery({
    queryKey: ['latestReservation'],
    queryFn: async () => {
      const latestReservation = await getLatestReservation();
      if (
        latestReservation.state === 'ON_HOLD' ||
        latestReservation.state === 'PAYMENT_FAIL'
      ) {
        return null;
      }

      return latestReservation;
    },
  });
  return { latestReservation: data };
};

export default useGetLatestReservation;
