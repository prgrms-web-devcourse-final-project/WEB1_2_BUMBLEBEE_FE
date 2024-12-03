import ListStyle from '@components/ListStyle';
import { GetAllReservation } from '@typings/types';
import { getDateFunction, getTimeFunction } from '@utils/formatTime';

const LatestReservation = ({ data }: { data: GetAllReservation }) => {
  const {
    workplaceName,
    workplaceImageUrl,
    studyRoomName,
    startTime,
    endTime,
    studyRoomCapacity,
    price,
  } = data;

  console.log(typeof startTime);

  return (
    <div className='flex h-[172px] w-[330px] flex-col rounded-[10px] bg-white p-[16px] shadow-[0_0_6px_0_rgba(0,0,0,0.25)]'>
      <div className='flex items-center gap-[18px]'>
        <div className='h-[118px] w-[118px]'>
          <img
            src={workplaceImageUrl}
            alt='스터디룸 사진'
            className='object-cover'
          />
        </div>

        <div className='flex w-[170px] flex-col gap-[7px]'>
          <p className='text-[16px] font-medium'>{workplaceName}</p>
          <ul className='flex flex-col gap-[2px] text-[12px]'>
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
              value={`${studyRoomCapacity} 인`}
            />
          </ul>
        </div>
      </div>
      <span className='self-end text-[14px] font-normal'>
        {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
      </span>
    </div>
  );
};

export default LatestReservation;
