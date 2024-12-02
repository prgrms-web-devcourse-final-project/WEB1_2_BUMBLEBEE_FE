import { getWorkPlace } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';

const useGetWorkPlaceInfo = (workplaceId: number) => {
  return useQuery({
    queryKey: ['workplaceInfo', workplaceId],
    queryFn: () => getWorkPlace(workplaceId),
  });
};

export default useGetWorkPlaceInfo;
