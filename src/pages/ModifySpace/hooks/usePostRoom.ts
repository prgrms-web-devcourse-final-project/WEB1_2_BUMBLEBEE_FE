import { postStudyRoom } from '@apis/workplace';
import { useMutation } from '@tanstack/react-query';
import { StudyRoomData } from '@typings/types';

const usePostRoom = () => {
  return useMutation({
    mutationFn: ({
      workPlaceId,
      studyroom,
    }: {
      workPlaceId: string;
      studyroom: StudyRoomData;
    }) => postStudyRoom(workPlaceId, studyroom),
  });
};

export default usePostRoom;
