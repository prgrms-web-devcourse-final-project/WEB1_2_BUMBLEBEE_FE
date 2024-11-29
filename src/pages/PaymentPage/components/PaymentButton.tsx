import {
  isValidKoreanName,
  isValidUserPhoneNumber,
} from '@utils/validationCheckRegex';
import { ERROR_MESSAGE } from '@constants/constants';
import { v4 as uuidv4 } from 'uuid';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { postReservation } from '@apis/reservation';
import useSearchStore from '@store/searchStore';
import type {
  ReservationFormData,
  ErrorMessageType,
  CheckState,
  PayMethodType,
  StudyRoomInfo,
} from '..';

interface PaymentButtonProps {
  studyRoomInfo: StudyRoomInfo;
  reservationForm: ReservationFormData;
  onSetErrorMessage: (value: ErrorMessageType) => void;
  checkState: CheckState;
  payMethod: PayMethodType;
  totalAmount: number;
}

const PaymentButton = (props: PaymentButtonProps) => {
  const {
    studyRoomInfo,
    reservationForm,
    onSetErrorMessage,
    checkState,
    payMethod,
    totalAmount,
  } = props;

  const { searchDate, formattedTime, searchPeople } = useSearchStore();

  const startTimeStr = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')} ${formattedTime[0]}`;
  const endTimeStr = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')} ${formattedTime[1]}`;

  const startTime = new Date(startTimeStr);
  const endTime = new Date(endTimeStr);

  const orderName = `${studyRoomInfo.workplaceName} ${studyRoomInfo.studyRoomTitle} 예약`;

  const isValid = () => {
    const newError = {
      nameError: '',
      phonNumberError: '',
      reservationCheckError: '',
      paymentCheckError: '',
      payMethodError: '',
    };

    if (!isValidKoreanName(reservationForm.name)) {
      newError.nameError = ERROR_MESSAGE.name;
    }
    if (!isValidUserPhoneNumber(reservationForm.phoneNumber)) {
      newError.phonNumberError = ERROR_MESSAGE.phonNumber;
    }
    if (checkState.reservation.length < 3) {
      newError.reservationCheckError = ERROR_MESSAGE.check;
    }
    if (checkState.payment.length < 2) {
      newError.paymentCheckError = ERROR_MESSAGE.check;
    }
    if (payMethod === null) {
      newError.payMethodError = ERROR_MESSAGE.payMethod;
    }

    onSetErrorMessage(newError);
  };

  const clientKey = import.meta.env.VITE_APP_TOSS_CLIENT_KEY;
  const customerKey = uuidv4();

  const handlePayment = async (): Promise<void> => {
    const tossPayments = await loadTossPayments(clientKey);
    const payment = tossPayments.payment({ customerKey });
    const orderId = uuidv4();

    const formattedPhoneNumber = reservationForm.phoneNumber.replace(/-/g, '');
    await payment
      .requestPayment({
        method: 'CARD',
        amount: {
          currency: 'KRW',
          value: totalAmount,
        },
        orderId,
        orderName,
        successUrl: `${window.location.origin}/payment-loading`,
        failUrl: `${window.location.origin}/payment-fail`,
        customerName: reservationForm.name,
        customerMobilePhone: formattedPhoneNumber,
        card: {
          useEscrow: false,
          flowMode: 'DIRECT',
          easyPay: '토스페이',
          useCardPoint: false,
        },
      })
      .catch((error) => {
        if (error.code === 'USER_CANCEL') {
          console.log('유저 취소');
        } else {
          console.log(error.message);
        }
      });
  };

  const handlePaymentButton = async () => {
    isValid();
    if (
      isValidKoreanName(reservationForm.name) &&
      isValidUserPhoneNumber(reservationForm.phoneNumber) &&
      checkState.reservation.length === 3 &&
      checkState.payment.length === 2 &&
      payMethod
    ) {
      const reservationData = {
        reservationName: reservationForm.name,
        reservationPhoneNumber: reservationForm.phoneNumber,
        reservationCapacity: searchPeople,
        reservationPrice: totalAmount,
        startTime,
        endTime,
      };
      const reservationId = await postReservation(
        studyRoomInfo.studyRoomId,
        reservationData,
      );
      console.log(reservationId);
      handlePayment();
    }
  };

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-[30px] pb-[30px] pt-[18px]'>
      <button
        type='button'
        onClick={handlePaymentButton}
        className='btn-primary'
      >
        {totalAmount.toLocaleString('ko-KR')}원 결제하기
      </button>
    </div>
  );
};

export default PaymentButton;
