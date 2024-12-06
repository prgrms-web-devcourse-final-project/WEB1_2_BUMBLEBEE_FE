import { postPositionWorkPlace } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';
import {
  GetPositionWorkPlaceData,
  MapPosition,
  NowPosition,
} from '@typings/types';

const useGetWorkplaceData = (
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

export default useGetWorkplaceData;
