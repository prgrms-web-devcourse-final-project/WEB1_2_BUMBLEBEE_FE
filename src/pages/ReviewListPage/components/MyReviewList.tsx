import { SyncLoader } from 'react-spinners';
import useGetMyReviewList from '../hooks/useGetMyReviewList';
import MyReviewCard from './MyReviewCard';

const MyReviewList = () => {
  const { myReviewList, isLoading } = useGetMyReviewList();

  const sortedReviewList = myReviewList
    ? [...myReviewList].sort((b, a) => {
        return +new Date(a.reviewDate) - +new Date(b.reviewDate);
      })
    : [];

  return (
    <>
      {isLoading ? (
        <div className='flex h-[300px] w-full items-center justify-center'>
          <SyncLoader color='#50BEAD' />
        </div>
      ) : (
        <>
          {myReviewList && myReviewList.length > 0 ? (
            <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
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
      )}
    </>
  );
};

export default MyReviewList;
