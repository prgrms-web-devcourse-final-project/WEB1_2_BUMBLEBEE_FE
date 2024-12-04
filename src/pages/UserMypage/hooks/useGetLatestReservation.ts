import { getLatestReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

const useGetLatestReservation = () => {
  const { data } = useQuery({
    queryKey: ['latestReservation'],
    queryFn: () => getLatestReservation(),
  });
  return { latestReservation: data };
};

export default useGetLatestReservation;
