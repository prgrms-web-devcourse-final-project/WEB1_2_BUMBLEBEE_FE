import { getUserData } from '@apis/member';
import { useQuery } from '@tanstack/react-query';
import { Member } from '@typings/types';

const useGetUserData = () => {
  const { data } = useQuery({
    queryKey: ['member'],
    queryFn: () => getUserData(),
  });
  return { user: (data ?? []) as Member };
};

export default useGetUserData;
