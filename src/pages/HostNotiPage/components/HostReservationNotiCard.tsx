import { BusinessNotification } from '@typings/types';
import { getDateFunction } from '@utils/formatTime';
import { Link } from 'react-router-dom';

interface HostNotiProps {
  item: BusinessNotification;
}

const HostReservationNotiCard = ({ item }: HostNotiProps) => {
  const {
    content,
    createdAt,
    workplaceName,
    url,
    reservationName,
    studyRoomName,
    price,
  } = item;

  return (
    <>
      <Link to='/management-reserver-list'>
        <div className='mx-auto flex w-[100%] flex-col gap-3 text-sm active:bg-[#e9e9e9]'>
          <div className='mx-auto w-custom px-1.5 py-[13px]'>
            <p className='font-medium'>새로운 예약</p>

            <div className='mt-2 flex flex-col gap-1'>
              <p className='text-xs text-subfont'>
                {getDateFunction(createdAt)}
              </p>
              <div className='flex justify-between gap-3'>
                <div className='flex w-[260px] flex-col'>
                  <p className='w-[100%]'>{`${reservationName}${content}`}</p>
                  <p className='w-[100%] overflow-hidden text-ellipsis whitespace-nowrap'>
                    {`${workplaceName} / ${studyRoomName}`}
                  </p>
                  <p className='mt-2'>
                    {price?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
                  </p>
                </div>

                <img
                  src={url}
                  alt='스터디룸 사진'
                  className='h-10 w-10 object-cover'
                />
              </div>
            </div>
          </div>
        </div>
      </Link>
    </>
  );
};

export default HostReservationNotiCard;
