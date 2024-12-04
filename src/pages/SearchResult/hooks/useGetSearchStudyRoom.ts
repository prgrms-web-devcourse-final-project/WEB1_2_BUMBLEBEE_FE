import { getSearchStudyRoom } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';
import { SearchStudyRoom, SearchStudyRoomData } from '@typings/types';

export const useGetSearchStudyRoom = (searchStudyRoom: SearchStudyRoom) => {
  const { data, isLoading, isError } = useQuery<SearchStudyRoomData[]>({
    queryKey: ['searchStudyRoom'],
    queryFn: () => getSearchStudyRoom(searchStudyRoom),
  });

  return { data: (data ?? []) as SearchStudyRoomData[], isLoading, isError };
};

export default useGetSearchStudyRoom;
