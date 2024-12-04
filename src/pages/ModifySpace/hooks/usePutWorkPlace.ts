import { putWorkPlace } from '@apis/workplace';
import { useMutation } from '@tanstack/react-query';

const usePutWorkPlace = () => {
  return useMutation({
    mutationFn: putWorkPlace,
  });
};

export default usePutWorkPlace;
