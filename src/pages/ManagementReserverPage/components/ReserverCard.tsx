import { MdArrowForwardIos } from 'react-icons/md';
import { getDateFunction, getTimeFunction } from '@utils/formatTime';
import { ReserverInfo } from './ReserverList';

const ReserverCard = ({ item }: { item: ReserverInfo }) => {
  const {
    studyroomTitle,
    roomTitle,
    reservationName,
    reservationPhonenumber,
    startTime,
    endTime,
    price,
    studyroomImage,
    createdAt,
    numberOfReserver,
  } = item;

  return (
    <div className='mx-auto flex w-custom flex-col gap-2 border-b border-solid border-b-black px-[13px] py-[26px]'>
      <div className='flex justify-between'>
        <div className='flex flex-col items-start gap-4'>
          <div className='flex cursor-pointer items-center gap-1.5 font-medium'>
            {studyroomTitle}
            <MdArrowForwardIos className='w-3' />
          </div>

          <ul className='flex flex-col gap-1 text-[12px]'>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>예약자명</p>
              <span className='font-normal'>{reservationName}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>전화번호</p>
              <span className='font-normal'>{reservationPhonenumber}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>예약된 룸</p>
              <span className='font-normal'>{roomTitle}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>예약일</p>
              <span className='font-normal'>{getDateFunction(startTime)}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>예약 시간</p>
              <span className='font-normal'>
                {getTimeFunction(startTime)} ~ {getTimeFunction(endTime)}
              </span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>인원</p>
              <span className='font-normal'>{numberOfReserver}인</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>인원</p>
              <span className='font-normal'>{getDateFunction(createdAt)}</span>
            </li>
          </ul>
        </div>

        <div className='flex flex-col justify-between'>
          <img
            src={studyroomImage}
            alt='스터디룸 사진'
            className='h-[50px] w-[50px] cursor-pointer object-cover'
          />
          <span className='self-end text-sm font-normal'>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
          </span>
        </div>
      </div>
    </div>
  );
};

export default ReserverCard;
