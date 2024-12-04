import { getStudyroomDetail } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';
import { StudyRoomDetailData } from '@typings/types';

const useGetStudyroomDetail = (studyRoomId: number) => {
  const { data, isLoading, isError } = useQuery<StudyRoomDetailData>({
    queryKey: ['studyroomDetail', studyRoomId],
    queryFn: () => getStudyroomDetail(studyRoomId),
  });

  return { data: (data ?? {}) as StudyRoomDetailData, isLoading, isError };
};

export default useGetStudyroomDetail;
