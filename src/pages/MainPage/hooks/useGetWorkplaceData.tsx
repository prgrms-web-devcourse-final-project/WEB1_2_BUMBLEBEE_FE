import { getRecommendWorkPlace, postPositionWorkPlace } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';
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

export const useGetRecommendData = (isLogin: boolean, isUser: boolean) => {
  const { data, isLoading, isError } = useQuery<GetPositionWorkPlaceData[]>({
    queryKey: ['recommendWorkPlace', isLogin, isUser],
    queryFn: () => getRecommendWorkPlace(),
    enabled: isLogin && isUser,
  });

  return {
    data: (data ?? []) as GetPositionWorkPlaceData[],
    isLoading,
    isError,
  };
};
