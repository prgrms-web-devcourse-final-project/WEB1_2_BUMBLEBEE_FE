interface Reservation {
  name: string;
  date: string;
  time: string;
  room: string;
  people: number;
  price: number;
}

const latestReservationCard: Reservation = {
  name: 'ABC스터디룸',
  date: '2024.06.08',
  time: '14:00',
  room: 'ROOM A',
  people: 4,
  price: 8000,
};

const LatestReservation = () => {
  return (
    <div className='flex h-auto w-[330px] flex-col rounded-[10px] bg-white p-[16px] shadow-[0_0_6px_0_rgba(0,0,0,0.25)]'>
      <div className='flex items-center gap-[18px]'>
        <img
          src='https://modo-phinf.pstatic.net/20180304_61/1520159998510ED9Yt_JPEG/mosaSDaCsR.jpeg'
          alt='스터디룸 사진'
          className='h-[118px] w-[118px] object-cover'
        />

        <div className='flex w-[auto] flex-col gap-[7px]'>
          <p className='text-[16px] font-medium'>
            {latestReservationCard.name}
          </p>
          <ul className='flex flex-col gap-[2px] text-[12px]'>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>예약일</p>
              <span className='font-normal'>{latestReservationCard.date}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>예약시간</p>
              <span className='font-normal'>{latestReservationCard.time}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>예약된 룸</p>
              <span className='font-normal'>{latestReservationCard.room}</span>
            </li>
            <li className='flex gap-[12px]'>
              <p className='w-[46px]'>인원</p>
              <span className='font-normal'>
                {latestReservationCard.people}인
              </span>
            </li>
          </ul>
        </div>
      </div>
      <span className='self-end text-[14px] font-normal'>
        {latestReservationCard.price}원
      </span>
    </div>
  );
};

export default LatestReservation;
