import { GetWorkPlaceData } from '@typings/types';
import { useInView } from 'react-intersection-observer';
import { useEffect } from 'react';
import { FaStar, FaRegStar } from 'react-icons/fa6';
import { getDateFunction } from '@utils/formatTime';
import useReviewScroll from '../hooks/useReviewScroll';

const WorkPlaceReview = ({
  workplaceDetailData,
}: {
  workplaceDetailData: GetWorkPlaceData;
}) => {
  const {
    data: reviewList,
    fetchNextPage,
    hasNextPage,
  } = useReviewScroll(workplaceDetailData.workplaceId);

  // 리스트의 마지막 요소 감지
  const { ref: observerRef, inView } = useInView({
    triggerOnce: false,
    threshold: 1.0,
  });

  // 다음 페이지를 불러오기
  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, fetchNextPage, hasNextPage]);

  // 리뷰 별 채우기
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
    <div className='w-custom'>
      {reviewList?.pages?.map((page, pageIndex) => (
        <div key={page.nextCursor || `page-${pageIndex}`}>
          {page.data.map((review, reviewIndex) => {
            // 페이지 내 마지막 리뷰인지 확인
            const isLastReviewInPage = reviewIndex === page.data.length - 1;

            return (
              <div
                key={review.reviewId}
                className={`border-subfont py-[16px] ${isLastReviewInPage ? 'border-none' : 'border-b'}`}
                ref={isLastReviewInPage ? observerRef : null} // 페이지의 마지막 리뷰에만 ref 적용
              >
                <p className='mb-[8px] text-[16px] font-medium'>
                  {review.memberNickName}
                </p>
                <div className='flex flex-col'>
                  <div className='flex text-[12px] text-primary'>
                    {showRatingWithStar(review.reviewRating)}
                  </div>
                  <p className='mt-[6px] text-[14px]'>{review.reviewContent}</p>
                </div>
                <div className='mt-[11px] text-xs text-subfont'>
                  {getDateFunction(review.reviewDate)}
                </div>
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default WorkPlaceReview;
