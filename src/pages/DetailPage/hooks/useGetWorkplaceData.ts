import { useQuery } from '@tanstack/react-query';
import { getWorkPlace } from '../../../apis/workplace';

const useGetWorkplaceData = (workplaceId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['workplaceDetail', workplaceId],
    queryFn: () => getWorkPlace(workplaceId),
  });
  return { data, isLoading };
};

export default useGetWorkplaceData;
