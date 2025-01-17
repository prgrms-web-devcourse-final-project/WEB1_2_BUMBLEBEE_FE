import {
  isValidKoreanName,
  isValidUserPhoneNumber,
} from '@utils/validationCheckRegex';
import { ERROR_MESSAGE } from '@constants/constants';
import { v4 as uuidv4 } from 'uuid';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import { postPaymentsToss, postReservation } from '@apis/reservation';
import useSearchStore from '@store/searchStore';
import { PostPaymentsData } from '@typings/types';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
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

  const startTime = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')}T${formattedTime[0]}:00`;
  const endTime = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')}T${formattedTime[1]}:00`;

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
  const orderId = uuidv4();

  const navigate = useNavigate();

  const handlePayment = async (response: PostPaymentsData): Promise<void> => {
    const tossPayments = await loadTossPayments(clientKey);
    const payment = tossPayments.payment({ customerKey });

    const formattedPhoneNumber = response.memberPhoneNum.replace(/-/g, '');
    await payment
      .requestPayment({
        method: response.tossPaymentMethod,
        amount: {
          currency: 'KRW',
          value: response.amount,
        },
        orderId: response.orderId,
        orderName: response.orderName,
        successUrl: `${window.location.origin}/payment-loading`, // `${window.location.origin}/payment-loading` or `${window.location.origin}/api/v1/payments/toss/success`
        failUrl: `${window.location.origin}/payment-fail`, // `${window.location.origin}/payment-fail` or `${window.location.origin}/api/v1/payments/toss/fail`
        customerName: response.memberName,
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
          toast.error('유저가 결제를 취소했습니다');
          navigate(
            `/payment-fail?orderId=${response.orderId}&message=${error.message}&code=${error.code}`,
          );
        } else {
          toast.error(error.message);
        }
      });
  };

  const handlePaymentButton = async () => {
    isValid();

    if (totalAmount === 0) {
      toast.error('결제 금액을 확인해주세요');
      return;
    }

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
        capacity: searchPeople,
        price: totalAmount,
        startTime,
        endTime,
      };

      const orderForm = {
        orderId,
        orderName,
        totalAmount,
        memberName: reservationForm.name,
        memberPhoneNum: reservationForm.phoneNumber,
        tossPaymentMethod: 'CARD',
      };

      // 예약 요청
      const reservationId = await postReservation(
        studyRoomInfo.studyRoomId,
        reservationData,
      );

      // 결제 검증
      const paymentResponse = await postPaymentsToss(reservationId, orderForm);

      // 결제 승인 요청
      await handlePayment(paymentResponse);
    }
  };

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-center border-t-[1px] border-t-subfont bg-white pb-[16px]'>
      <div className='flex items-center gap-2'>
        <button
          type='button'
          onClick={handlePaymentButton}
          className='btn-primary w-custom px-1'
        >
          {totalAmount.toLocaleString('ko-KR')}원 결제하기
        </button>
      </div>
    </div>
  );
};

export default PaymentButton;
