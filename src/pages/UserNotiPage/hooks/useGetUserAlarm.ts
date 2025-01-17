import { getUserAlarm } from '@apis/member';
import { useQuery } from '@tanstack/react-query';

const useGetUserAlarm = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['userAlarm'],
    queryFn: getUserAlarm,
  });

  return { data, isLoading };
};

export default useGetUserAlarm;
