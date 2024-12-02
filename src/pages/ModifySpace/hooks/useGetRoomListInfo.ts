import { getWorkplaceStudyRoom } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';

const useGetRoomListInfo = (workplaceId: number) => {
  return useQuery({
    queryKey: ['roomList', workplaceId],
    queryFn: () => getWorkplaceStudyRoom(workplaceId),
  });
};

export default useGetRoomListInfo;
