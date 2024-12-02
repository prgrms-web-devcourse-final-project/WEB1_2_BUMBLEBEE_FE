import ListStyle from '@components/ListStyle';
import { GetAllReservation } from '@typings/types';
import { getStringFromDate, getStringFromDateTime } from '@utils/formatTime';

const LatestReservation = ({ data }: { data: GetAllReservation }) => {
  return (
    <div className='flex h-[172px] w-[330px] flex-col rounded-[10px] bg-white p-[16px] shadow-[0_0_6px_0_rgba(0,0,0,0.25)]'>
      <div className='flex items-center gap-[18px]'>
        <img
          src='https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg'
          alt='스터디룸 사진'
          className='h-[118px] w-[118px] object-cover'
        />

        <div className='flex w-[auto] flex-col gap-[7px]'>
          <p className='text-[16px] font-medium'>{data.workplaceName}</p>
          <ul className='flex flex-col gap-[2px] text-[12px]'>
            <ListStyle
              name='예약일'
              value={getStringFromDate(data.startTime)}
            />
            <ListStyle
              name='예약시간'
              value={`${getStringFromDateTime(data.startTime)} ~ ${getStringFromDateTime(data.endTime)}`}
            />
            {/* <ListStyle
              name='예약된 룸'
              value={latestReservationCard.room}
            /> */}
            <ListStyle
              name='인원'
              value={`${data.studyRoomCapacity} 인`}
            />
          </ul>
        </div>
      </div>
      <span className='self-end text-[14px] font-normal'>
        {data.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원
      </span>
    </div>
  );
};

export default LatestReservation;
