import { getDateFunction, getTimeFunction } from '@utils/formatTime';
import ButtonInCard from '@components/ButtonInCard';
import { Reservation } from '@pages/WriteReviewPage/components/ReservationInfo';
import { useNavigate } from 'react-router-dom';
import ListStyle from '@components/ListStyle';
import { useState } from 'react';
import Modal from '@components/Modal';

const ReservationDetailCard = ({ item }: { item: Reservation }) => {
  const { name, date, time, endtime, room, people, price, img, createdAt } =
    item;
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const now = new Date();
  const gap = +new Date(time) - +now;

  // 예약 시간으로부터 24시간 전인지 확인
  const buttonType = (timeGap: number): string => {
    let buttonText = '';
    const MILLISECONDS_24_HOURS = 24 * 60 * 60 * 1000;

    // 예약시간 24시간 전까지는 결제 취소 버튼
    if (timeGap > MILLISECONDS_24_HOURS) {
      buttonText = 'cancelPayment';
    }
    // 예약 시간 전 하루(24시간)동안은 버튼 없음
    if (timeGap > 0 && timeGap <= MILLISECONDS_24_HOURS) {
      buttonText = 'none';
    }
    // 예약 시간 지나면 리뷰 작성 버튼
    if (timeGap < 0) {
      buttonText = 'review';
    }

    return buttonText;
  };

  const handleReviewButton = () => {
    navigate('/write-review');
  };

  const handleCancelPayment = () => {
    console.log('결제 취소');
    setModalOpen(() => false);
  };

  return (
    <>
      <div className='mx-auto flex w-custom flex-col gap-[18px] border-b border-solid border-b-black px-[13px] py-[24px]'>
        <div className='flex items-center gap-[18px]'>
          <img
            src={img}
            alt='스터디룸 사진'
            className='h-[118px] w-[118px] object-cover'
          />

          <div className='flex w-[auto] flex-col gap-[7px]'>
            <p className='text-[16px] font-medium'>{name}</p>
            <ul className='flex flex-col gap-[2px] text-[12px]'>
              <ListStyle
                name='예약일'
                value={date}
              />
              <ListStyle
                name='예약시간'
                value={`${getTimeFunction(time)} ~ ${getTimeFunction(endtime as string)}`}
              />
              <ListStyle
                name='예약된 룸'
                value={room}
              />
              <ListStyle
                name='인원'
                value={`${people}인`}
              />
              <ListStyle
                name='결제일'
                value={getDateFunction(createdAt as string)}
              />
            </ul>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          {buttonType(gap) === 'cancelPayment' && (
            <ButtonInCard
              name='결제 취소'
              onClickFunction={() => setModalOpen(true)}
            />
          )}
          {buttonType(gap) === 'review' && (
            <ButtonInCard
              name='리뷰 작성'
              onClickFunction={handleReviewButton}
            />
          )}
          {buttonType(gap) === 'none' && (
            <span className='text-[12px] text-primary'>
              방문 24시간 전입니다.
            </span>
          )}
          <span className='self-end text-[14px] font-normal'>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
          </span>
        </div>
        {modalOpen && (
          <Modal
            message='결제를 취소하시겠습니까?'
            onCancelButtonClick={() => setModalOpen(false)}
            onConfirmButtonClick={handleCancelPayment}
          />
        )}
      </div>
    </>
  );
};

export default ReservationDetailCard;
