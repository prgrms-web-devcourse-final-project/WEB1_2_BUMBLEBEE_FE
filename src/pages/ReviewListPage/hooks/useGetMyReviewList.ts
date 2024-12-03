import { getMyReview } from '@apis/review';
import { useQuery } from '@tanstack/react-query';

const useGetMyReviewList = () => {
  const { data } = useQuery({
    queryKey: ['myReview'],
    queryFn: () => getMyReview(),
  });
  return { data };
};

export default useGetMyReviewList;
