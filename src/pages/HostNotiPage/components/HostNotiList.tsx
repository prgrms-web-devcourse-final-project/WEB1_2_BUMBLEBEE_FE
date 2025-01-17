import { SyncLoader } from 'react-spinners';
import { AiFillInfoCircle } from 'react-icons/ai';
import { getWithinSevenDays } from '@utils/formatTime';
import ShowWithinSevenDays from '@components/ShowWithinSevenDays';
import useGetBusinessNotification from '../hooks/useGetBusinessNotification';
import HostReservationNotiCard from './HostReservationNotiCard';
import HostReviewNotiCard from './HostReviewNotiCard';

const HostNotiList = () => {
  const { allNotification, isLoading } = useGetBusinessNotification();

  const sortedNotification = [...allNotification].sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  return (
    <>
      {isLoading ? (
        <div className='flex h-[300px] w-full items-center justify-center'>
          <SyncLoader color='#50BEAD' />
        </div>
      ) : (
        <>
          {sortedNotification && sortedNotification.length > 0 ? (
            <div className='mt-4 flex w-[375px] flex-col justify-center gap-[13px] pb-24'>
              <div className='mx-auto flex w-custom items-center gap-1 self-start pl-[6px] text-sm text-subfont'>
                <AiFillInfoCircle />
                3달이 경과된 알림은 자동 삭제처리됩니다.
              </div>
              <hr className='mx-[22.5px] w-custom border-[0.5px] border-dashed' />
              {sortedNotification.map((item, index) => {
                const uniqueKey =
                  item.notificationType === 'REVIEW_CREATED'
                    ? `review-${item.reviewId || index}`
                    : `reservation-${item.reservationId || index}`;

                const prevItem = sortedNotification[index - 1];

                // 구분선 표시 조건
                const showDivider =
                  prevItem &&
                  getWithinSevenDays(prevItem.createdAt) &&
                  !getWithinSevenDays(item.createdAt);

                if (item.notificationType === 'REVIEW_CREATED') {
                  return (
                    <>
                      {showDivider && <ShowWithinSevenDays label='최근 7일' />}
                      <HostReviewNotiCard
                        key={uniqueKey}
                        item={item}
                      />
                    </>
                  );
                }

                return (
                  <>
                    {showDivider && <ShowWithinSevenDays label='최근 7일' />}
                    <HostReservationNotiCard
                      key={uniqueKey}
                      item={item}
                    />
                  </>
                );
              })}
            </div>
          ) : (
            <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
              알림이 없습니다.
            </div>
          )}
        </>
      )}
    </>
  );
};

export default HostNotiList;
