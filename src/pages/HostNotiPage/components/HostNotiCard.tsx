import { getDateFunction } from '@utils/formatTime';
import ShowWithinSevenDays from '@components/ShowWithinSevenDays';
import { UserNotification } from '@pages/UserNotiPage/components/UserNotiList';

interface HostNotiProps {
  item: UserNotification;
  showLabel: boolean;
}

const HostNotiCard = ({ item, showLabel }: HostNotiProps) => {
  const { type, message, reservationInfo, createdAt } = item;

  return (
    <>
      <div className='mx-auto flex w-[100%] flex-col gap-3 text-sm active:bg-[#e9e9e9]'>
        <div className='mx-auto w-custom px-1.5 py-[13px]'>
          {type === 'newReview' ? (
            <p className='font-medium'>새 리뷰 등록</p>
          ) : (
            <p className='font-medium'>새로운 예약</p>
          )}

          <div className='flex flex-col gap-1'>
            <p className='text-xs text-subfont'>{getDateFunction(createdAt)}</p>
            <div className='flex justify-between gap-3'>
              {type === 'newReview' ? (
                <div className='flex w-[260px] flex-col'>
                  <p className='w-[100%]'>
                    {reservationInfo}에 새로운 리뷰가 등록되었습니다.
                  </p>
                  <p className='w-[100%] overflow-hidden text-ellipsis whitespace-nowrap text-[#666666]'>
                    {message}
                  </p>
                </div>
              ) : (
                <div className='flex w-[260px] flex-col'>
                  <p className='w-[100%]'>{message}</p>
                  <p className='w-[100%]'>{reservationInfo}</p>
                </div>
              )}

              <img
                src='https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg'
                alt='스터디룸 사진'
                className='h-10 w-10 object-cover'
              />
            </div>
          </div>
        </div>
      </div>
      {showLabel ? <ShowWithinSevenDays label='7일 이내' /> : null}
    </>
  );
};

export default HostNotiCard;
