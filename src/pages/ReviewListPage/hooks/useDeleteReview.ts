import { deleteReview } from '@apis/review';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface DeleteReviewProps {
  id: number;
  placeName: string;
}

const useDeleteReview = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, placeName }: DeleteReviewProps) =>
      deleteReview(id, placeName),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myReview'] });
    },
  });
};

export default useDeleteReview;
