import { getBusinessWorkPlace } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';

const useGetBusinessWorkplaces = () => {
  const { data } = useQuery({
    queryKey: ['businessWorkplaces'],
    queryFn: () => getBusinessWorkPlace(),
  });
  return { workplaces: data?.workplaces ?? [] };
};

export default useGetBusinessWorkplaces;
