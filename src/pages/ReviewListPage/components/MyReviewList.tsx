import MyReviewCard from './MyReviewCard';

export interface Review {
  reviewId: number;
  name: string;
  reviewContent: string;
  reviewRating: number;
  createdAt: string;
  img: string;
}

const myReviewList: Review[] = [
  {
    reviewId: 1,
    name: '스터디랩',
    reviewContent:
      '스터디룸이 매우 깨끗하고 조용해서 집중도가 높아졌습니다. 시설도 최신이고 필요한 장비도 모두 갖춰져 있어 학습에 최적화된 환경이었어요.',
    reviewRating: 5,
    createdAt: '2024-11-12T14:00:00',
    img: 'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg',
  },
  {
    reviewId: 2,
    name: '스터디랩',
    reviewContent: '조용하고 좋았어요.',
    reviewRating: 4,
    createdAt: '2024-11-20T14:00:00',
    img: 'https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg',
  },
];

const MyReviewList = () => {
  const sortedReviewList = [...myReviewList].sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  return (
    <>
      {myReviewList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center'>
          {sortedReviewList.map((item) => {
            return (
              <MyReviewCard
                key={item.reviewId}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
          작성한 리뷰가 없습니다.
        </div>
      )}
    </>
  );
};

export default MyReviewList;
