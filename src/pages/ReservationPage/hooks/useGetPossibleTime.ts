import { getPossibleTime } from '@apis/workplace';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PossibleTime } from '@typings/types';

type ModifyDateType = { studyRoomId: number; checkDate: Date };

export const useGetPossibleTime = (studyRoomId: number, checkDate: Date) => {
  const { data, isLoading, isError } = useQuery<PossibleTime>({
    queryKey: ['studyroomDetail', studyRoomId, checkDate],
    queryFn: () => getPossibleTime(studyRoomId, checkDate),
  });

  return { data: (data ?? {}) as PossibleTime, isLoading, isError };
};

export const usePossibleTimeMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<PossibleTime, Error, ModifyDateType>({
    mutationFn: ({ studyRoomId, checkDate }) =>
      getPossibleTime(studyRoomId, checkDate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['studyroomDetail'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
