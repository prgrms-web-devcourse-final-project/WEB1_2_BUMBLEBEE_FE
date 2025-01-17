import { useMemo, useState } from 'react';
import { SyncLoader } from 'react-spinners';
import useGetAllMyReservations from '../hooks/useGetAllMyReservations';
import ReservationDetailCard from './ReservationDetailCard';

const ReservationList = () => {
  const [activeTab, setActiveTab] = useState('최근 결제순');
  const { reservationList, isLoading } = useGetAllMyReservations();

  // 최근 결제일순으로 정렬
  const sortedReservationWithPayment = useMemo(() => {
    return [...reservationList].sort(
      (b, a) =>
        +new Date(a.reservationCreatedAt) - +new Date(b.reservationCreatedAt),
    );
  }, [reservationList]);

  // 예약일순으로 정렬
  const sortedReservationWithDate = useMemo(() => {
    return [...reservationList].sort(
      (b, a) => +new Date(a.startTime) - +new Date(b.startTime),
    );
  }, [reservationList]);

  if (isLoading) {
    return (
      <div className='flex h-[300px] w-full items-center justify-center'>
        <SyncLoader color='#50BEAD' />
      </div>
    );
  }

  if (!reservationList || reservationList.length === 0) {
    return (
      <div className='mt-[47px] w-[375px] text-center text-[14px] font-normal text-subfont'>
        예약 내역이 없습니다.
      </div>
    );
  }

  return (
    <>
      <div className='mt-[6px] flex w-[375px] flex-col justify-center pb-24'>
        <div className='mx-auto mt-5 flex w-custom justify-end gap-2 text-[13px]'>
          <button
            type='button'
            className={
              activeTab === '최근 결제순' ? 'text-focusColor' : 'text-subfont'
            }
            onClick={() => setActiveTab('최근 결제순')}
          >
            최근 결제순
          </button>
          <span>|</span>
          <button
            type='button'
            className={
              activeTab === '예약일순' ? 'text-focusColor' : 'text-subfont'
            }
            onClick={() => setActiveTab('예약일순')}
          >
            예약일순
          </button>
        </div>

        {activeTab === '최근 결제순' &&
          sortedReservationWithPayment.map((item) => {
            return (
              <ReservationDetailCard
                key={item.reservationId}
                item={item}
              />
            );
          })}

        {activeTab === '예약일순' &&
          sortedReservationWithDate.map((item) => {
            return (
              <ReservationDetailCard
                key={item.reservationId}
                item={item}
              />
            );
          })}
      </div>
    </>
  );
};

export default ReservationList;
