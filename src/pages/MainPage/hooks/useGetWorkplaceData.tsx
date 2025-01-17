import { getRecommendWorkPlace, postPositionWorkPlace } from '@apis/workplace';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import {
  CenterPosition,
  GetPositionWorkPlaceData,
  MapPosition,
  NowPosition,
} from '@typings/types';
import { AxiosError } from 'axios';

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
  const { data, isLoading, isError } = useQuery<
    GetPositionWorkPlaceData[],
    AxiosError
  >({
    queryKey: ['recommendWorkPlace', isLogin, isUser],
    queryFn: () => getRecommendWorkPlace(),
    enabled: isLogin && isUser && activeTab !== '주변 스터디룸',
    retry: (failureCount, error: AxiosError) => {
      // 503 에러 발생 시 재요청 금지
      if (error.response?.status === 503) {
        return false;
      }
      return failureCount < 3;
    },
  });

  return {
    data: (data ?? []) as GetPositionWorkPlaceData[],
    isLoading,
    isError,
  };
};
