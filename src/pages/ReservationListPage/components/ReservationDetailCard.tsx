import { getDateFunction, getTimeFunction } from '@utils/formatTime';
import ButtonInCard from '@components/ButtonInCard';
import { Link, useNavigate } from 'react-router-dom';
import ListStyle from '@components/ListStyle';
import { useState } from 'react';
import Modal from '@components/Modal';
import { Reservation } from '@typings/types';
import { MdArrowForwardIos } from 'react-icons/md';

const ReservationDetailCard = ({ item }: { item: Reservation }) => {
  const {
    workplaceId,
    workplaceName,
    reservationCreatedAt,
    startTime,
    endTime,
    studyRoomCapacity,
    price,
    workplaceImageUrl,
    studyRoomName,
  } = item;
  const navigate = useNavigate();

  const [modalOpen, setModalOpen] = useState(false);

  const now = new Date();
  const gap = +new Date(startTime) - +now;

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
    navigate('/write-review', {
      state: {
        workplaceName: `${workplaceName}`,
        studyRoomName: `${studyRoomName}`,
        reservationCreatedAt: `${getDateFunction(reservationCreatedAt)}`,
        reservationDay: `${getDateFunction(startTime)}`,
        reservationTime: `${getTimeFunction(startTime)} ~ ${getTimeFunction(endTime)}`,
        studyRoomCapacity: `${studyRoomCapacity}`,
        price: `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
      },
    });
  };

  const handleCancelPayment = () => {
    console.log('결제 취소');
    setModalOpen(() => false);
  };

  return (
    <>
      <div className='mx-auto flex w-custom flex-col gap-[18px] border-b border-solid border-b-black px-[13px] py-[24px]'>
        <div className='flex w-[auto] flex-col gap-4'>
          <span className='flex items-center gap-1 text-[16px] font-medium'>
            <Link to={`/detail/${workplaceId}`}>{workplaceName}</Link>
            <MdArrowForwardIos />
          </span>

          <div className='flex items-center justify-between'>
            <ul className='flex flex-col gap-1 text-[12px]'>
              <ListStyle
                name='예약일'
                value={getDateFunction(startTime)}
              />
              <ListStyle
                name='예약시간'
                value={`${getTimeFunction(startTime)} ~ ${getTimeFunction(endTime)}`}
              />
              <ListStyle
                name='예약된 룸'
                value={studyRoomName}
              />
              <ListStyle
                name='인원'
                value={`${studyRoomCapacity}인`}
              />
              <ListStyle
                name='결제일'
                value={getDateFunction(reservationCreatedAt)}
              />
            </ul>
            <img
              src={workplaceImageUrl}
              alt='스터디룸 사진'
              className='h-[118px] w-[118px] bg-subfont object-cover'
            />
          </div>
        </div>
        <div className='flex items-end justify-between'>
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
            <span className='flex h-[34px] flex-col justify-end text-[12px] text-primary'>
              방문 24시간 전입니다.
            </span>
          )}
          <span className='text-[14px] font-normal'>
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
