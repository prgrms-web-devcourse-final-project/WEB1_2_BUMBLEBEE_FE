import { getPossibleTime } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';
import { PossibleTime } from '@typings/types';

const useGetPossibleTime = (studyRoomId: number, checkDate: Date) => {
  const { data, isLoading, isError } = useQuery<PossibleTime>({
    queryKey: ['studyroomDetail', studyRoomId, checkDate],
    queryFn: () => getPossibleTime(studyRoomId, checkDate),
    enabled: !!studyRoomId && !!checkDate,
  });

  return { data: (data ?? {}) as PossibleTime, isLoading, isError };
};

export default useGetPossibleTime;
