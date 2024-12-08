import { getDateFunction } from '@utils/formatTime';
import { Alarm } from '@typings/types';

interface UserNotiProps {
  item: Alarm;
}

const UserNotiCard = ({ item }: UserNotiProps) => {
  const {
    notificationType,
    content,
    createdAt,
    price,
    imageUrl,
    workplaceName,
    studyRoomName,
  } = item;

  return (
    <>
      <div className='mx-auto flex w-[100%] flex-col gap-3 text-sm active:bg-[#e9e9e9]'>
        <div className='mx-auto w-custom px-1.5 py-[13px]'>
          {notificationType === 'upcoming' ? (
            <p className='font-medium'>다가오는 일정</p>
          ) : (
            <p className='font-medium'>예약 완료</p>
          )}

          <div className='mt-2 flex flex-col gap-1'>
            <p className='text-xs text-subfont'>{getDateFunction(createdAt)}</p>
            <div className='flex justify-between'>
              {!price ? (
                <div className='flex w-[260px] flex-col'>
                  <p className='w-[100%]'>{content}</p>
                  <p className='w-[100%]'>{studyRoomName}</p>
                </div>
              ) : (
                <div className='flex w-[260px] flex-col'>
                  <p className='w-[100%]'>{`${workplaceName} / ${studyRoomName} ${content}`}</p>
                  <p className='mt-2 w-[100%]'>
                    {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
                  </p>
                </div>
              )}

              <img
                src={imageUrl}
                alt='스터디룸 사진'
                className='h-10 w-10 object-cover'
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserNotiCard;
