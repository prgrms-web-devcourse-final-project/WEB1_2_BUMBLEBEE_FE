import { getMyReview } from '@apis/review';
import { useQuery } from '@tanstack/react-query';
import { Review } from '@typings/types';

const useGetMyReviewList = () => {
  const { data, isLoading } = useQuery({
    queryKey: ['myReview'],
    queryFn: () => getMyReview(),
  });
  return { myReviewList: (data ?? []) as Review[], isLoading };
};

export default useGetMyReviewList;
