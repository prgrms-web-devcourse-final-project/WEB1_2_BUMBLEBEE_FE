import { postReview } from '@apis/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { PostReviewRequestBody } from '@typings/types';
import { useNavigate } from 'react-router-dom';

const usePostReview = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const writeReview = useMutation({
    mutationFn: (data: PostReviewRequestBody) => postReview(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReview'] });
      navigate('/review-list');
    },
  });

  return writeReview;
};

export default usePostReview;
