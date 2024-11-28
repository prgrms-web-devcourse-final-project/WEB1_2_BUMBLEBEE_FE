import { getBusinessData } from '@apis/business';
import { useQuery } from '@tanstack/react-query';

const useGetBusinessData = () => {
  const { data } = useQuery({
    queryKey: ['business'],
    queryFn: () => getBusinessData(),
  });
  return { data };
};

export default useGetBusinessData;
