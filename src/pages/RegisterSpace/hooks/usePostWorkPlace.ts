import { postWorkPlace } from '@apis/workplace';
import { useMutation } from '@tanstack/react-query';

const usePostWorkPlace = () => {
  return useMutation({
    mutationFn: postWorkPlace,
  });
};

export default usePostWorkPlace;
