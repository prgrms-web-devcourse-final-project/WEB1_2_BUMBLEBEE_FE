import { getBusinessWorkPlace } from '@apis/workplace';
import { useQuery } from '@tanstack/react-query';

const useGetBusinessWorkplaces = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['businessWorkplaces'],
    queryFn: () => getBusinessWorkPlace(),
  });
  return { workplaces: data?.workplaces ?? [], isLoading };
};

export default useGetBusinessWorkplaces;
