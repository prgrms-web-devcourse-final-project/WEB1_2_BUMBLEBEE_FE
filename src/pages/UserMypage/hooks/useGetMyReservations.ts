import { getAllReservation } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

const useGetAllReservations = () => {
  const { data } = useQuery({
    queryKey: ['latestReservation'],
    queryFn: () => getAllReservation(),
  });
  return { data };
};

const useGetLatestReservation = () => {
  const { data } = useGetAllReservations();
};
