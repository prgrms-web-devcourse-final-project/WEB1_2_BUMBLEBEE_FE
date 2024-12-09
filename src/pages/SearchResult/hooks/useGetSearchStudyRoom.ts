import { postSearchStudyRoom } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';
import { SearchStudyRoom, SearchStudyRoomData } from '@typings/types';

export const useGetSearchStudyRoom = (searchStudyRoom: SearchStudyRoom) => {
  const { address, startDateTime, endDateTime, reservationCapacity } =
    searchStudyRoom;
  const isValidDateTime = (dateTime: string | undefined) =>
    !!dateTime && !dateTime.includes('undefined');

  const isQueryEnabled =
    !!address &&
    reservationCapacity > 0 &&
    isValidDateTime(startDateTime) &&
    isValidDateTime(endDateTime);

  const { data, isLoading, isError } = useQuery<SearchStudyRoomData[]>({
    queryKey: ['searchStudyRoom', searchStudyRoom.address],
    queryFn: () => postSearchStudyRoom(searchStudyRoom),
    enabled: isQueryEnabled,
  });

  return { data: (data ?? []) as SearchStudyRoomData[], isLoading, isError };
};

export default useGetSearchStudyRoom;
