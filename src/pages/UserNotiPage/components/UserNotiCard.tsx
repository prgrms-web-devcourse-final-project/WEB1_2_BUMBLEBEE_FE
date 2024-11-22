import { getDateFunction } from '@utils/formatTime';
import { UserNotification } from './UserNotiList';

const UserNotiCard = ({ item }: { item: UserNotification }) => {
  const { type, message, reservationInfo, createdAt, price } = item;

  return (
    <>
      <div className='mx-auto flex w-custom flex-col gap-3 px-1.5 py-[13px] text-sm'>
        {type === 'upcoming' ? (
          <p className='font-medium'>다가오는 일정</p>
        ) : (
          <p className='font-medium'>예약 완료</p>
        )}

        <div className='flex flex-col gap-1'>
          <p className='text-xs text-subfont'>{getDateFunction(createdAt)}</p>
          <div className='flex justify-between'>
            {!price ? (
              <div className='flex flex-col'>
                <p>{message}</p>
                <p>{reservationInfo}</p>
              </div>
            ) : (
              <div className='flex flex-col'>
                <p>{`${reservationInfo} ${message}`}</p>
                <p>
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
    </>
  );
};

export default UserNotiCard;
