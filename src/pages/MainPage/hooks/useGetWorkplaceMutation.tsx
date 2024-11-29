import { getPositionWorkPlace } from '@apis/workplace';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  GetPositionWorkPlaceList,
  MapPosition,
  NowPosition,
} from '@typings/types';

const useGetWorkplaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    GetPositionWorkPlaceList,
    Error,
    { nowPosition: NowPosition; mapPosition: MapPosition }
  >({
    mutationFn: getPositionWorkPlace,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['nearWorkplace'] });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};

export default useGetWorkplaceMutation;
