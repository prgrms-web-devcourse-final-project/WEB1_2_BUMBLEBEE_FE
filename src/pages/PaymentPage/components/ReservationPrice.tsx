import DetailTitle from '@components/DetailTitle';
import useSearchStore from '@store/searchStore';
import { useEffect } from 'react';
import type { StudyRoomInfo } from '..';

interface ReservationPriceProps {
  studyRoomInfo: StudyRoomInfo;
  totalAmount: number;
  onSetTotalAmount: (value: number) => void;
}

const ReservationPrice = (props: ReservationPriceProps) => {
  const { studyRoomInfo, totalAmount, onSetTotalAmount } = props;
  const { studyRoomTitle, studyRoomPrice } = studyRoomInfo;
  const { searchTime, searchPeople } = useSearchStore();

  const reservationPrice = studyRoomPrice * searchPeople;
  const reservationTime = searchTime.length;
  useEffect(() => {
    onSetTotalAmount(reservationPrice * reservationTime);
  }, [onSetTotalAmount, reservationPrice, reservationTime]);

  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='주문 상품' />
      <div>
        <div className='flex flex-col gap-[14px]'>
          <p className='font-normal'>{studyRoomTitle}</p>
          <div className='flex flex-col gap-1'>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex gap-1'>
                <span>{studyRoomPrice.toLocaleString('ko-KR')}</span>
                <span>X</span>
                <span>{searchPeople}인</span>
              </div>
              <div className='font-normal'>
                {reservationPrice.toLocaleString('ko-KR')}
                <span> 원</span>
              </div>
            </div>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex'>
                <span>{reservationTime}</span>
                <span>시간 이용</span>
              </div>
              <div className='font-normal'>
                {totalAmount.toLocaleString('ko-KR')}
                <span> 원</span>
              </div>
            </div>
          </div>
          <hr className='text-subfont' />
          <div className='flex items-center justify-between font-normal'>
            <span>총 결제 금액</span>
            <span className='text-primary'>
              {totalAmount.toLocaleString('ko-KR')}원
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationPrice;
