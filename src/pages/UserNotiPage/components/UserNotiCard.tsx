import { getDateFunction } from '@utils/formatTime';
import ShowWithinSevenDays from '@components/ShowWithinSevenDays';
import type { UserNotification } from './UserNotiList';

interface UserNotiProps {
  item: UserNotification;
  showLabel: boolean;
}

const UserNotiCard = ({ item, showLabel }: UserNotiProps) => {
  const { type, message, reservationInfo, createdAt, price } = item;

  return (
    <>
      <div className='mx-auto flex w-[100%] flex-col gap-3 text-sm active:bg-[#e9e9e9]'>
        <div className='mx-auto w-custom px-1.5 py-[13px]'>
          {type === 'upcoming' ? (
            <p className='font-medium'>다가오는 일정</p>
          ) : (
            <p className='font-medium'>예약 완료</p>
          )}

          <div className='flex flex-col gap-1'>
            <p className='text-xs text-subfont'>{getDateFunction(createdAt)}</p>
            <div className='flex justify-between'>
              {!price ? (
                <div className='flex w-[260px] flex-col'>
                  <p className='w-[100%]'>{message}</p>
                  <p className='w-[100%]'>{reservationInfo}</p>
                </div>
              ) : (
                <div className='flex w-[260px] flex-col'>
                  <p className='w-[100%]'>{`${reservationInfo} ${message}`}</p>
                  <p className='w-[100%]'>
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                  </p>
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

export default UserNotiCard;
