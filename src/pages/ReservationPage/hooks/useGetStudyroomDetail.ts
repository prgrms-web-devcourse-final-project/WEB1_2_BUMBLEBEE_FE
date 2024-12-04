import { getStudyroomDetail } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';
import { StudyRoomDetailData } from '@typings/types';

const useGetStudyroomDetail = (studyroomId: number) => {
  const { data, isLoading, isError } = useQuery<StudyRoomDetailData>({
    queryKey: ['studyroomDetail', studyroomId],
    queryFn: () => getStudyroomDetail(studyroomId),
  });

  return { data: (data ?? []) as StudyRoomDetailData, isLoading, isError };
};

export default useGetStudyroomDetail;
