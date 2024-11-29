import { getUserData } from '@apis/member';
import { useQuery } from '@tanstack/react-query';
import { Member } from '@typings/types';

const useGetUserData = () => {
  const { data } = useQuery<Member>({
    queryKey: ['member'],
    queryFn: () => getUserData(),
  });
  return { data };
};

export default useGetUserData;
