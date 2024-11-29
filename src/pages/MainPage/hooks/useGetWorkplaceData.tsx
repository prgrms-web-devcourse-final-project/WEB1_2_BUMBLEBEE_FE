import { getPositionWorkPlace } from '@apis/workplace';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetPositionWorkPlaceList,
  MapPosition,
  NowPosition,
} from '@typings/types';

export const useGetWorkplaceData = (
  nowPosition: NowPosition,
  mapPosition: MapPosition,
) => {
  const { data, isLoading, isError } = useQuery<GetPositionWorkPlaceList>({
    queryKey: ['nearWorkplace', nowPosition, mapPosition],
    queryFn: () => getPositionWorkPlace({ nowPosition, mapPosition }),
  });

  return { data, isLoading, isError };
};

export const useGetWorkplaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    GetPositionWorkPlaceList,
    Error,
    { nowPosition: NowPosition; mapPosition: MapPosition }
  >({
    mutationFn: getPositionWorkPlace,
    onSuccess: (_, variables) => {
      const { nowPosition, mapPosition } = variables;
      queryClient.invalidateQueries({
        queryKey: ['nearWorkplace', nowPosition, mapPosition],
      });
    },
    onError: (error) => {
      console.log(error);
    },
  });
};
