import { deleteStudyRoom } from '@apis/workplace';
import { useMutation } from '@tanstack/react-query';

const useDeleteRoom = () => {
  return useMutation({
    mutationFn: (studyRoomId: string) => deleteStudyRoom(studyRoomId),
  });
};

export default useDeleteRoom;
