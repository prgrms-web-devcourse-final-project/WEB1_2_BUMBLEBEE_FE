import ListStyle from '@components/ListStyle';
import { Reservation } from '@typings/types';
import { getDateFunction, getTimeFunction } from '@utils/formatTime';
import { Link } from 'react-router-dom';

const LatestReservation = ({ data }: { data: Reservation }) => {
  const {
    workplaceName,
    workplaceImageUrl,
    studyRoomName,
    startTime,
    endTime,
    reservationCapacity,
    price,
  } = data;

  return (
    <>
      <Link to='/reservation-list'>
        <div className='flex h-auto min-h-[172px] w-[330px] flex-col rounded-[10px] bg-white p-[16px] shadow-[0_0_6px_0_rgba(0,0,0,0.25)]'>
          <div className='flex justify-start gap-[13px]'>
            <img
              src={workplaceImageUrl}
              alt='스터디룸 사진'
              className='h-[118px] w-[118px] bg-subfont object-cover'
            />

            <div className='flex w-[170px] flex-col gap-[7px]'>
              <span className='break-word text-[16px] font-medium'>
                {workplaceName}
              </span>
              <ul className='flex flex-col gap-1 text-[12px]'>
                <ListStyle
                  name='예약일'
                  value={getDateFunction(startTime)}
                />
                <ListStyle
                  name='예약시간'
                  value={`${getTimeFunction(startTime)} ~ ${getTimeFunction(endTime)}`}
                />
                <ListStyle
                  name='예약된 룸'
                  value={studyRoomName}
                />
                <ListStyle
                  name='인원'
                  value={`${reservationCapacity}인`}
                />
              </ul>
            </div>
          </div>
          <span className='self-end text-[14px] font-normal'>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
          </span>
        </div>
      </Link>
    </>
  );
};

export default LatestReservation;
