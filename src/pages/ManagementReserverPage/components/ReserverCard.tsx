import { MdArrowForwardIos } from 'react-icons/md';
import { getDateFunction, getTimeFunction } from '@utils/formatTime';
import ListStyle from '@components/ListStyle';
import { ReserverInfo } from '@typings/types';
import { Link } from 'react-router-dom';

const ReserverCard = ({ item }: { item: ReserverInfo }) => {
  const {
    workplaceName,
    reservationName,
    reservationPhoneNumber,
    studyRoomName,
    reservationCreatedAt,
    reservationStartTime,
    reservationEndTime,
    reservationCapacity,
    workplaceImageUrl,
    workplaceId,
    reservationPrice,
  } = item;

  return (
    <div className='mx-auto flex w-custom flex-col gap-2 border-b border-solid border-b-black px-[13px] py-[26px]'>
      <div className='flex justify-between'>
        <div className='flex flex-col items-start gap-4'>
          <div className='flex cursor-pointer items-center gap-1.5 font-medium'>
            <Link to={`/detail/${workplaceId}`}>{workplaceName}</Link>
            <MdArrowForwardIos className='w-3' />
          </div>

          <ul className='flex flex-col gap-1 text-[12px]'>
            <ListStyle
              name='예약자명'
              value={reservationName}
            />
            <ListStyle
              name='전화번호'
              value={reservationPhoneNumber}
            />
            <ListStyle
              name='예약된 룸'
              value={studyRoomName}
            />
            <ListStyle
              name='예약일'
              value={getDateFunction(reservationStartTime)}
            />
            <ListStyle
              name='예약 시간'
              value={`${getTimeFunction(reservationStartTime)} ~ ${getTimeFunction(reservationEndTime)}`}
            />
            <ListStyle
              name='인원'
              value={`${reservationCapacity}인`}
            />
            <ListStyle
              name='결제일'
              value={getDateFunction(reservationCreatedAt)}
            />
          </ul>
        </div>

        <div className='flex flex-col justify-between'>
          <img
            src={workplaceImageUrl}
            alt='스터디룸 사진'
            className='h-[50px] w-[50px] object-cover'
          />
          <span className='self-end text-sm font-normal'>
            {reservationPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}{' '}
            원
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReserverCard;
