import { useInfiniteQuery } from '@tanstack/react-query';
import { getAllReview } from '@apis/review';
import { DetailReview } from '@typings/types';

const useReviewScroll = (workplaceId: number) => {
  return useInfiniteQuery<
    { data: DetailReview[]; nextCursor: number },
    { pageParam: number | undefined }
  >({
    queryKey: ['reviews', workplaceId],
    queryFn: async ({ pageParam }) => {
      return getAllReview(workplaceId, pageParam as number | undefined);
    },
    getNextPageParam: (lastPage) => lastPage.nextCursor,
    initialPageParam: undefined,
    enabled: !!workplaceId,
  });
};

export default useReviewScroll;
