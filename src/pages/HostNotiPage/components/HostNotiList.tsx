import useGetBusinessNotification from '../hooks/useGetBusinessNotification';
import HostReservationNotiCard from './HostReservationNotiCard';
import HostReviewNotiCard from './HostReviewNotiCard';

const HostNotiList = () => {
  const { allNotification } = useGetBusinessNotification();

  const sortedNotification = [...allNotification].sort((b, a) => {
    return +new Date(a.createdAt) - +new Date(b.createdAt);
  });

  return (
    <>
      {sortedNotification && sortedNotification.length > 0 ? (
        <div className='mt-4 flex w-[375px] flex-col justify-center gap-[13px] pb-24'>
          {sortedNotification.map((item, index) => {
            const uniqueKey =
              item.notificationType === 'REVIEW_CREATED'
                ? `review-${item.reviewId || index}`
                : `reservation-${item.reservationId || index}`;

            if (item.notificationType === 'REVIEW_CREATED') {
              return (
                <HostReviewNotiCard
                  key={uniqueKey}
                  item={item}
                />
              );
            }

            return (
              <HostReservationNotiCard
                key={uniqueKey}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
          알림이 없습니다.
        </div>
      )}
    </>
  );
};

export default HostNotiList;
