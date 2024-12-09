import { useCallback, useState } from 'react';
import useGetAllMyReservations from '../hooks/useGetAllMyReservations';
import ReservationDetailCard from './ReservationDetailCard';

const ReservationList = () => {
  const { reservationList } = useGetAllMyReservations();
  const [activeSortButton, setActiveSortButton] = useState(false);

  // 최근 결제일순으로 정렬
  const sortedReservationWithPayment = useCallback(() => {
    return [...reservationList].sort(
      (b, a) =>
        +new Date(a.reservationCreatedAt) - +new Date(b.reservationCreatedAt),
    );
  }, [reservationList]);

  const sortedWithPayment = sortedReservationWithPayment();

  // 예약일순으로 정렬
  const sortedReservationWithDate = useCallback(() => {
    return [...reservationList].sort(
      (b, a) => +new Date(a.startTime) - +new Date(b.startTime),
    );
  }, [reservationList]);

  const sortedWithDate = sortedReservationWithDate();

  console.log(reservationList);

  return (
    <>
      {reservationList && reservationList.length > 0 ? (
        <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
          <div className='mx-auto mt-5 flex w-custom justify-end gap-2 text-[13px]'>
            <button
              type='button'
              className={!activeSortButton ? 'text-focusColor' : 'text-subfont'}
              onClick={() => setActiveSortButton(!activeSortButton)}
            >
              최근 결제순
            </button>
            <span>|</span>
            <button
              type='button'
              className={activeSortButton ? 'text-focusColor' : 'text-subfont'}
              onClick={() => setActiveSortButton(!activeSortButton)}
            >
              예약일순
            </button>
          </div>
          {!activeSortButton
            ? sortedWithPayment.map((item) => {
                return (
                  <ReservationDetailCard
                    key={item.reservationId}
                    item={item}
                  />
                );
              })
            : sortedWithDate.map((item) => {
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
