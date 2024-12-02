import { useQuery } from '@tanstack/react-query';
import { getWorkplaceStudyRoom } from '../../../apis/workplace';

const useGetStudyroomOfWorkplace = (workplaceId: number) => {
  const { data, isLoading } = useQuery({
    queryKey: ['studyroomOfWorkplace', workplaceId],
    queryFn: () => getWorkplaceStudyRoom(workplaceId),
  });
  return { data, isLoading };
};

export default useGetStudyroomOfWorkplace;
