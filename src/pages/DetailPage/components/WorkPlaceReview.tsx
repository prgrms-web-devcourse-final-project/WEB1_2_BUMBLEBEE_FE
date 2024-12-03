import ReviewComponent from './ReviewComponent';

// 임시 데이터
interface ReviewData {
  reviewId: number;
  userName: string;
  reviewRating: number;
  content: string;
  createdAt: string;
}

const reviewList: ReviewData[] = [
  {
    reviewId: 1,
    userName: '푸른 새우',
    reviewRating: 3,
    content:
      '스터디룸이 매우 깨끗하고 조용해서 집중도가 높아졌습니다. 시설도 최신이고 필요한 장비도 모두 갖춰져 있어 학습에 최적화된 환경이었어요. 예약과 이용 절차도 간편해 만족도가 높습니다.',
    createdAt: '2024-12-03T14:00:00',
  },
  {
    reviewId: 2,
    userName: '마른 새우',
    reviewRating: 4,
    content:
      '스터디룸이 매우 깨끗하고 조용해서 집중도가 높아졌습니다. 시설도 최신이고 필요한 장비도 모두 갖춰져 있어 학습에 최적화된 환경이었어요. 예약과 이용 절차도 간편해 만족도가 높습니다.',
    createdAt: '2024-12-12T14:00:00',
  },
  {
    reviewId: 3,
    userName: '마른 유자',
    reviewRating: 2,
    content:
      '스터디룸이 매우 깨끗하고 조용해서 집중도가 높아졌습니다. 시설도 최신이고 필요한 장비도 모두 갖춰져 있어 학습에 최적화된 환경이었어요. 예약과 이용 절차도 간편해 만족도가 높습니다.',
    createdAt: '2024-11-12T14:00:00',
  },
];

const WorkPlaceReview = () => {
  return (
    <div className='w-custom'>
      {reviewList.map((item) => (
        <div
          key={item.reviewId}
          className='border-b border-subfont py-[16px] last:border-none'
        >
          <ReviewComponent review={item} />
        </div>
      ))}
    </div>
  );
};

export default WorkPlaceReview;
