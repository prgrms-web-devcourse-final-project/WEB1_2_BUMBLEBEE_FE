import { getAllReserver } from '@apis/reservation';
import { useQuery } from '@tanstack/react-query';
import { ReserverInfo } from '@typings/types';

const useGetReserver = () => {
  const { data } = useQuery({
    queryKey: ['reserver'],
    queryFn: () => getAllReserver(),
  });
  return { reserverList: (data ?? []) as ReserverInfo[] };
};

export default useGetReserver;
