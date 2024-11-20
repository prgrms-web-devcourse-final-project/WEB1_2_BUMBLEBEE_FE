export interface Reservation {
  roomId?: number;
  name: string;
  date: string;
  time: string;
  endtime?: string;
  room: string;
  people: number;
  price: number;
  img?: string;
  createdAt?: string;
}

const ReservationInfoData: Reservation = {
  name: 'ABC스터디룸',
  date: '2024.06.08',
  time: '14:00',
  room: 'ROOM A',
  people: 4,
  price: 8000,
};

const ReservationInfo = () => {
  return (
    <div className='mx-[22.5px] my-[26px] w-custom px-[8px]'>
      <p className='mb-3 text-base font-normal'>{ReservationInfoData.name}</p>
      <ul className='flex flex-col gap-[4px] text-[14px]'>
        <li className='flex gap-[18px]'>
          <p className='w-[54px]'>예약일</p>
          <span className='font-normal'>{ReservationInfoData.date}</span>
        </li>
        <li className='flex gap-[18px]'>
          <p className='w-[54px]'>예약시간</p>
          <span className='font-normal'>{ReservationInfoData.time}</span>
        </li>
        <li className='flex gap-[18px]'>
          <p className='w-[54px]'>예약된 룸</p>
          <span className='font-normal'>{ReservationInfoData.room}</span>
        </li>
        <li className='flex gap-[18px]'>
          <p className='w-[54px]'>인원</p>
          <span className='font-normal'>{ReservationInfoData.people}인</span>
        </li>
        <li className='flex gap-[18px]'>
          <p className='w-[54px]'>금액</p>
          <span className='font-normal'>
            {ReservationInfoData.price
              .toString()
              .replace(/\B(?=(\d{3})+(?!\d))/g, ',')}
            원
          </span>
        </li>
      </ul>
    </div>
  );
};

export default ReservationInfo;
