import ListStyle from '@components/ListStyle';

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
      <ul className='flex flex-col gap-[4px] text-[12px]'>
        <ListStyle
          name='예약일'
          value={ReservationInfoData.date}
        />
        <ListStyle
          name='예약시간'
          value={ReservationInfoData.time}
        />
        <ListStyle
          name='예약된 룸'
          value={ReservationInfoData.room}
        />
        <ListStyle
          name='인원'
          value={`${ReservationInfoData.people}인`}
        />
        <ListStyle
          name='금액'
          value={`${ReservationInfoData.price
            .toString()
            .replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원`}
        />
      </ul>
    </div>
  );
};

export default ReservationInfo;
