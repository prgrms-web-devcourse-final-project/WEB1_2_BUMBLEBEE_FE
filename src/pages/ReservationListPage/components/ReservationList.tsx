import useGetAllMyReservations from '../hooks/useGetAllMyReservations';
import ReservationDetailCard from './ReservationDetailCard';

const ReservationList = () => {
  const { reservationList } = useGetAllMyReservations();

  // 최근 결제 순으로 정렬
  const sortedReservationList = [...reservationList].sort(
    (b, a) => +new Date(a.startTime) - +new Date(b.startTime),
  );

  console.log(reservationList);

  return (
    <>
      {reservationList && reservationList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
          <div className='mx-auto flex w-custom justify-end gap-1 text-sm text-subfont'>
            <button
              type='button'
              className='active:text-focusColor'
            >
              최근 결제순
            </button>
            <span>|</span>
            <button
              type='button'
              className='active:text-focusColor'
            >
              예약일순
            </button>
          </div>
          {sortedReservationList.map((item) => {
            return (
              <ReservationDetailCard
                key={item.reservationId}
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
