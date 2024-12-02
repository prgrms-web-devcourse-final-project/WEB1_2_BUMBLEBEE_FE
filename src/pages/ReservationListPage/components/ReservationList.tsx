import useGetAllMyReservations from '../hooks/useGetAllMyReservations';
import ReservationDetailCard from './ReservationDetailCard';

const ReservationList = () => {
  const reservationCardList = useGetAllMyReservations();

  // 최근 결제 순으로 정렬
  const sortedReservationList = [...reservationCardList].sort(
    (b, a) => +a.reservationCreatedAt - +b.reservationCreatedAt,
  );

  return (
    <>
      {reservationCardList && reservationCardList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
          {sortedReservationList.map((item) => {
            return (
              <ReservationDetailCard
                key={item.workplaceName}
                item={item}
              />
            );
          })}
        </div>
      ) : (
        <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
          예약 내역이 없습니다.
        </div>
      )}
    </>
  );
};

export default ReservationList;
