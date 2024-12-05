import { getDateFunction, getTimeFunction } from '@utils/formatTime';
import ButtonInCard from '@components/ButtonInCard';
import { Link, useNavigate } from 'react-router-dom';
import ListStyle from '@components/ListStyle';
import { useState } from 'react';
import Modal from '@components/Modal';
import { Reservation } from '@typings/types';
import { MdArrowForwardIos } from 'react-icons/md';
import { FaArrowRight } from 'react-icons/fa6';
import useCancelPayment from '../hooks/useCancelPayment';

interface CancelPaymentText {
  buttonText: string;
  cancelPaymentText: string;
}

const ReservationDetailCard = ({ item }: { item: Reservation }) => {
  const {
    workplaceId,
    workplaceName,
    reservationCreatedAt,
    startTime,
    endTime,
    reservationCapacity,
    price,
    workplaceImageUrl,
    studyRoomName,
    reservationId,
    existReview,
    state,
  } = item;
  const navigate = useNavigate();
  const { mutate: cancelPayment } = useCancelPayment();

  const [modalOpen, setModalOpen] = useState(false);

  const now = new Date();
  const gap = +new Date(startTime) - +now;

  // 예약 시간으로부터 24시간 전인지 확인
  const buttonType = (timeGap: number): CancelPaymentText => {
    let buttonText = '';
    let cancelPaymentText = '';
    const MILLISECONDS_24_HOURS = 24 * 60 * 60 * 1000;
    const MILLISECONDS_48_HOURS = MILLISECONDS_24_HOURS * 2;

    // 예약시간 24시간 전까지는 결제 취소 버튼
    if (timeGap > MILLISECONDS_24_HOURS) {
      buttonText = 'cancelPayment';
      if (timeGap > MILLISECONDS_48_HOURS) {
        cancelPaymentText = '총 금액의 100%가 환불됩니다.';
      }
      if (timeGap < MILLISECONDS_48_HOURS) {
        cancelPaymentText = '총 금액의 50%가 환불됩니다.';
      }
    }
    // 예약 시간 전 하루(24시간)동안은 버튼 없음
    if (timeGap > 0 && timeGap <= MILLISECONDS_24_HOURS) {
      buttonText = 'none';
    }
    // 예약 시간 지나면 리뷰 작성 버튼
    if (timeGap < 0) {
      buttonText = 'review';
    }

    return { buttonText, cancelPaymentText };
  };

  const { buttonText, cancelPaymentText } = buttonType(gap);

  const handleReviewButton = () => {
    navigate('/write-review', {
      state: {
        workPlaceName: `${workplaceName}`,
        studyRoomName: `${studyRoomName}`,
        reservationCreatedAt: `${getDateFunction(reservationCreatedAt)}`,
        reservationDay: `${getDateFunction(startTime)}`,
        reservationTime: `${getTimeFunction(startTime)} ~ ${getTimeFunction(endTime)}`,
        reservationCapacity: `${reservationCapacity}`,
        price: `${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}`,
        reservationId: `${reservationId}`,
      },
    });
  };

  const handleCancelPayment = () => {
    cancelPayment(reservationId);
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
                value={`${reservationCapacity}인`}
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
          {existReview ? (
            <Link to='/review-list'>
              <div className='flex h-[34px] items-end justify-end text-[12px] text-subfont active:text-focusColor'>
                <span className='flex items-center gap-1'>
                  리뷰 작성이 완료된 예약입니다
                  <FaArrowRight />
                </span>
              </div>
            </Link>
          ) : (
            <>
              {buttonText === 'cancelPayment' &&
                (state !== 'CANCELLED' ? (
                  <ButtonInCard
                    name='결제 취소'
                    onClickFunction={() => setModalOpen(true)}
                  />
                ) : (
                  <span className='flex h-[34px] flex-col justify-end text-[12px] text-red-500'>
                    결제 취소된 예약입니다.
                  </span>
                ))}
              {buttonText === 'review' && (
                <ButtonInCard
                  name='리뷰 작성'
                  onClickFunction={handleReviewButton}
                />
              )}
              {buttonText === 'none' && (
                <span className='flex h-[34px] flex-col justify-end text-[12px] text-primary'>
                  방문 24시간 전입니다.
                </span>
              )}
            </>
          )}
          <span className='text-[14px] font-normal'>
            {price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')} 원
          </span>
        </div>
        {modalOpen && (
          <Modal
            message='결제를 취소하시겠습니까?'
            cancelPaymentMessage={cancelPaymentText}
            onCancelButtonClick={() => setModalOpen(false)}
            onConfirmButtonClick={handleCancelPayment}
          />
        )}
      </div>
    </>
  );
};

export default ReservationDetailCard;
