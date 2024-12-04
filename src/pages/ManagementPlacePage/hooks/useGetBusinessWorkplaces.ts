import { getBusinessWorkPlace } from '@apis/workplace';
import useGetStudyroomOfWorkplace from '@pages/DetailPage/hooks/useGetStudyroomOfWorkplace';
import { useQuery } from '@tanstack/react-query';

export const useGetBusinessWorkplaces = () => {
  const { data } = useQuery({
    queryKey: ['businessWorkplaces'],
    queryFn: () => getBusinessWorkPlace(),
  });
  return { data };
};

export const useGetNumberOfRooms = (workplaceId: number) => {
  const { data } = useGetStudyroomOfWorkplace(workplaceId);
  const numberOfRoom = data ? data.length : 0;

  return numberOfRoom;
};

export const useGetWorkplacesList = () => {
  const { data } = useGetBusinessWorkplaces();
  const workplaceList = data ? data.workplaces : [];

  return workplaceList;
};
