import { getRecommendWorkPlace, postPositionWorkPlace } from '@apis/workplace';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  CenterPosition,
  GetPositionWorkPlaceData,
  MapPosition,
  NowPosition,
} from '@typings/types';

export const useGetWorkplaceData = (
  nowPosition: NowPosition,
  mapPosition: MapPosition,
  centerPosition: CenterPosition,
) => {
  const isMapEnabled =
    mapPosition.topRight.lat !== 0 || mapPosition.bottomLeft.lat !== 0;
  const { data, isLoading, isError, refetch } = useQuery<
    GetPositionWorkPlaceData[]
  >({
    queryKey: ['nearWorkplace', nowPosition, mapPosition, centerPosition],
    queryFn: () => postPositionWorkPlace({ nowPosition, mapPosition }),
    enabled: isMapEnabled,
    placeholderData: keepPreviousData,
  });

  return { data, isLoading, isError, refetch };
};

export const useGetRecommendData = (
  isLogin: boolean,
  isUser: boolean,
  activeTab: string,
) => {
  const { data, isLoading, isError } = useQuery<GetPositionWorkPlaceData[]>({
    queryKey: ['recommendWorkPlace', isLogin, isUser],
    queryFn: () => getRecommendWorkPlace(),
    enabled: isLogin && isUser && activeTab !== '주변 스터디룸',
  });

  return {
    data: (data ?? []) as GetPositionWorkPlaceData[],
    isLoading,
    isError,
  };
};
