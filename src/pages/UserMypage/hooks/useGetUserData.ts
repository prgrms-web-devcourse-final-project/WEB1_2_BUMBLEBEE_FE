import { getUserData } from '@apis/member';
import { useQuery } from '@tanstack/react-query';

const useGetUserData = () => {
  const { data } = useQuery({
    queryKey: ['member'],
    queryFn: () => getUserData(),
  });
  return { data };
};

export default useGetUserData;
