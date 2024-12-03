import { postReview } from '@apis/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostReviewRequestBody } from '@typings/types';

const usePostReview = (data: PostReviewRequestBody) => {
  const queryClient = useQueryClient();

  const writeReview = useMutation({
    mutationFn: () => postReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReview'] });
    },
  });

  return writeReview;
};

export default usePostReview;
