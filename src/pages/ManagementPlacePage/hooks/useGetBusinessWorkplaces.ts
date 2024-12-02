import { getBusinessWorkPlace } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';

export const useGetBusinessWorkplaces = () => {
  const { data } = useQuery({
    queryKey: ['businessWorkplaces'],
    queryFn: () => getBusinessWorkPlace(),
  });
  return { data };
};

export const useGetWorkplacesList = () => {
  const { data } = useGetBusinessWorkplaces();
  const workplaceList = data ? data.workplaces : [];

  return workplaceList;
};
