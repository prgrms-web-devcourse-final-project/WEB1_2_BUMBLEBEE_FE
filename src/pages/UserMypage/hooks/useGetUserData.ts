import { getUserData } from '@apis/member';
import { useQuery } from '@tanstack/react-query';
import { Member } from '@typings/types';

const useGetUserData = () => {
  const { data, isLoading, isError } = useQuery<Member>({
    queryKey: ['member'],
    queryFn: () => getUserData(),
  });
  return { data, isLoading, isError };
};

export default useGetUserData;
