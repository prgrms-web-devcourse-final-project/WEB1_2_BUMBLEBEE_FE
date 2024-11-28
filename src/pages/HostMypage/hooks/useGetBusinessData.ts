import { getBusinessData } from '@apis/business';
import { useQuery } from '@tanstack/react-query';

const useGetBusinessData = () => {
  const { data, isLoading, isError } = useQuery({
    queryKey: ['business'],
    queryFn: () => getBusinessData(),
  });
  return { data, isLoading, isError };
};

export default useGetBusinessData;
