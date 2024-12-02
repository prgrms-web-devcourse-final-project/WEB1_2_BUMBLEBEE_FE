import { MdArrowForwardIos } from 'react-icons/md';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { getFormattedDateFunction } from '@utils/formatTime';
import { Review } from '@typings/types';

const MyReviewCard = ({ item }: { item: Review }) => {
  const { reviewContent, reviewRating, studyRoomName, reviewDate } = item;

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
    <div className='mx-auto flex w-custom flex-col gap-[13px] border-b border-solid border-b-black px-[13px] py-[26px]'>
      <div className='flex items-start justify-between'>
        <div className='flex cursor-pointer items-center gap-1.5 font-medium'>
          {/* {workplaceName} */}
          사업장 이름
          <MdArrowForwardIos className='w-3' />
        </div>
        <img
          src='사진'
          alt='스터디룸 사진'
          className='h-[50px] w-[50px] cursor-pointer object-cover'
        />
      </div>

      <div className='flex flex-col gap-2'>
        <div className='text-xs'>{studyRoomName}</div>
        <div className='flex text-xs text-primary'>
          {showRatingWithStar(reviewRating)}
        </div>
        <p className='text-sm'>{reviewContent}</p>
      </div>

      <div className='text-xs text-subfont'>
        {getFormattedDateFunction(reviewDate)}
      </div>
    </div>
  );
};

export default MyReviewCard;
