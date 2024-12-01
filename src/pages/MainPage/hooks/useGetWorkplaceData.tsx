import { postPositionWorkPlace } from '@apis/workplace';
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
  const { data, isLoading, isError, refetch } =
    useQuery<GetPositionWorkPlaceList>({
      queryKey: ['nearWorkplace', nowPosition, mapPosition],
      queryFn: () => postPositionWorkPlace({ nowPosition, mapPosition }),
      enabled: false,
    });

  return { data, isLoading, isError, refetch };
};

export const useGetWorkplaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    GetPositionWorkPlaceList,
    Error,
    { nowPosition: NowPosition; mapPosition: MapPosition }
  >({
    mutationFn: postPositionWorkPlace,
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
