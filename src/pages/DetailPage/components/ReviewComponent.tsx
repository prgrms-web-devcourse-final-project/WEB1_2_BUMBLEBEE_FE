import { getDateFunction } from '@utils/formatTime';
import { FaStar, FaRegStar } from 'react-icons/fa6';

interface ReviewComponentProps {
  review: {
    reviewId: number;
    userName: string;
    reviewRating: number;
    content: string;
    createdAt: string;
  };
}

const ReviewComponent = ({ review }: ReviewComponentProps) => {
  const showRatingWithStar = (rating: number) => {
    const result = [];
    for (let i: number = 0; i < 5; i += 1) {
      result.push(
        <span key={i + 1}>{i + 1 <= rating ? <FaStar /> : <FaRegStar />}</span>,
      );
    }

    return result;
  };

  return (
    <div>
      <p className='mb-[8px] text-[16px] font-medium'>{review.userName}</p>
      <div className='flex flex-col'>
        <div className='flex text-[12px] text-primary'>
          {showRatingWithStar(review.reviewRating)}
        </div>
        <p className='mt-[6px] text-[14px]'>{review.content}</p>
      </div>
      <div className='mt-[11px] text-xs text-subfont'>
        {getDateFunction(review.createdAt)}
      </div>
    </div>
  );
};

export default ReviewComponent;
