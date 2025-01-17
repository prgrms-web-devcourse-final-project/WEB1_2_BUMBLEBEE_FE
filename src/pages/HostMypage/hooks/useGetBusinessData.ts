import { getBusinessData } from '@apis/business';
import { useQuery } from '@tanstack/react-query';
import { Business } from '@typings/types';

const useGetBusinessData = () => {
  const { data } = useQuery({
    queryKey: ['business'],
    queryFn: () => getBusinessData(),
  });
  return { business: (data ?? {}) as Business };
};

export default useGetBusinessData;
