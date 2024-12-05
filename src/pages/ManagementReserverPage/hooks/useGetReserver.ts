import { getAllReserver } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';

const useGetReserver = () => {
  const { data } = useQuery({
    queryKey: ['reserver'],
    queryFn: () => getAllReserver(),
  });
  return { reserver: data ?? [] };
};

export default useGetReserver;
