import { putEditReview } from '@apis/review';
import { useMutation } from '@tanstack/react-query';
import { PutReviewRequestBody } from '@typings/types';
import { useNavigate } from 'react-router-dom';

interface EditReviewDataProps {
  id: number;
  placeName: string;
  newData: PutReviewRequestBody;
}

const useEditReview = () => {
  const navigate = useNavigate();

  const editReview = useMutation({
    mutationFn: ({ id, placeName, newData }: EditReviewDataProps) =>
      putEditReview(id, placeName, newData),
    onSuccess: () => {
      navigate('/review-list');
    },
  });

  return editReview;
};

export default useEditReview;
