import { getUserAlarm } from '@apis/member';
import { useQuery } from '@tanstack/react-query';

const useGetUserAlarm = () => {
  return useQuery({
    queryKey: ['userAlarm'],
    queryFn: getUserAlarm,
  });
};

export default useGetUserAlarm;
