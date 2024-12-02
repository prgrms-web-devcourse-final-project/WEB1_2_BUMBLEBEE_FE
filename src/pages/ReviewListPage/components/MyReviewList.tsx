import useGetMyReviewList from '../hooks/useGetMyReviewList';
import MyReviewCard from './MyReviewCard';

const MyReviewList = () => {
  const { data: myReviewList } = useGetMyReviewList();

  const sortedReviewList = myReviewList
    ? [...myReviewList].sort((b, a) => {
        return +a.reviewDate - +b.reviewDate;
      })
    : [];

  return (
    <>
      {myReviewList && myReviewList.length > 0 ? (
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
