import ListStyle from '@components/ListStyle';

interface ReservationInfoProp {
  workplaceName: string;
  reservationCreatedAt: string;
  reservationTime: string;
  studyRoomCapacity: number;
  price: string;
  reservationDay: string;
  studyRoomName: string;
}

const ReservationInfo = ({ item }: { item: ReservationInfoProp }) => {
  const {
    workplaceName,
    reservationTime,
    studyRoomCapacity,
    price,
    reservationDay,
    reservationCreatedAt,
    studyRoomName,
  } = item;

  return (
    <div className='mx-[22.5px] my-[26px] flex w-custom flex-col gap-1 px-[8px]'>
      <p className='mb-3 text-base font-normal'>{workplaceName}</p>
      <ul className='flex flex-col gap-1 text-[12px]'>
        <ListStyle
          name='예약일'
          value={reservationDay}
        />
        <ListStyle
          name='예약시간'
          value={reservationTime}
        />
        <ListStyle
          name='예약된 룸'
          value={studyRoomName}
        />
        <ListStyle
          name='인원'
          value={studyRoomCapacity}
        />
        <ListStyle
          name='금액'
          value={`${price} 원`}
        />
        <ListStyle
          name='결제일'
          value={reservationCreatedAt}
        />
      </ul>
    </div>
  );
};

export default ReservationInfo;
