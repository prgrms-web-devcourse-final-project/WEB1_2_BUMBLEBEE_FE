import { postPositionWorkPlace } from '@apis/workplace';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  GetPositionWorkPlaceData,
  MapPosition,
  NowPosition,
} from '@typings/types';

export const useGetWorkplaceData = (
  nowPosition: NowPosition,
  mapPosition: MapPosition,
) => {
  const isMapEnabled =
    mapPosition.topRight.lat !== 0 || mapPosition.bottomLeft.lat !== 0;
  const { data, isLoading, isError, refetch } = useQuery<
    GetPositionWorkPlaceData[]
  >({
    queryKey: ['nearWorkplace', nowPosition, mapPosition],
    queryFn: () => postPositionWorkPlace({ nowPosition, mapPosition }),
    enabled: isMapEnabled,
  });

  return { data, isLoading, isError, refetch };
};

export const useGetWorkplaceMutation = () => {
  const queryClient = useQueryClient();

  return useMutation<
    GetPositionWorkPlaceData[],
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
