// import { postStudyRoom } from '@apis/workplace';
import { useMutation } from '@tanstack/react-query';

const usePostRoom = () => {
  return useMutation({
    // mutationFn: postStudyRoom,
  });
};

export default usePostRoom;
