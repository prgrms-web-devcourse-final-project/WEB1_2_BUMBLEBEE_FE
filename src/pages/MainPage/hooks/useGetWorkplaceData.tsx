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
  const { data, isLoading, isError, refetch } = useQuery<
    GetPositionWorkPlaceData[]
  >({
    queryKey: ['nearWorkplace', nowPosition, mapPosition],
    queryFn: () => postPositionWorkPlace({ nowPosition, mapPosition }),
  });

  return { data, isLoading, isError, refetch };
};

export default useGetWorkplaceData;
