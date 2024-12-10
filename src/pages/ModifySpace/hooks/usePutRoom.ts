import { putStudyRoom } from '@apis/workplace';
import { useMutation } from '@tanstack/react-query';
import { StudyRoomData } from '@typings/types';

const usePutRoom = () => {
  return useMutation({
    mutationFn: ({
      studyRoomId,
      studyroom,
    }: {
      studyRoomId: string;
      studyroom: StudyRoomData;
    }) => putStudyRoom(studyRoomId, studyroom),
  });
};

export default usePutRoom;
