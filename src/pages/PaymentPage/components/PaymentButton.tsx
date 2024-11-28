import {
  isValidKoreanName,
  isValidUserPhoneNumber,
} from '@utils/validationCheckRegex';
import { ERROR_MESSAGE } from '@constants/constants';
import { v4 as uuidv4 } from 'uuid';
import { loadTossPayments } from '@tosspayments/tosspayments-sdk';
import type { ReservationFormData, ErrorMessageType, CheckState } from '..';

interface PaymentButtonProps {
  reservationForm: ReservationFormData;
  onSetErrorMessage: (value: ErrorMessageType) => void;
  checkState: CheckState;
}

const PaymentButton = (props: PaymentButtonProps) => {
  const { reservationForm, onSetErrorMessage, checkState } = props;

  const isValid = () => {
    const newError = {
      nameError: '',
      phonNumberError: '',
      reservationCheckError: '',
      paymentCheckError: '',
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

    onSetErrorMessage(newError);
  };

  const clientKey = import.meta.env.VITE_APP_TOSS_CLIENT_KEY;
  const customerKey = uuidv4();

  const handlePayment = async (): Promise<void> => {
    const tossPayments = await loadTossPayments(clientKey);
    const payment = tossPayments.payment({ customerKey });
    const orderId = uuidv4();

    const formattedPhoneNumber = reservationForm.phoneNumber.replace(/-/g, '');
    await payment.requestPayment({
      method: 'CARD',
      amount: {
        currency: 'KRW',
        value: 50000,
      },
      orderId,
      orderName: '스터디룸 예약',
      successUrl: `${window.location.origin}/payment-success`,
      failUrl: `${window.location.origin}/payment-fail`,
      customerEmail: 'customer123@gmail.com',
      customerName: reservationForm.name,
      customerMobilePhone: formattedPhoneNumber,
      card: {
        useEscrow: false,
        flowMode: 'DIRECT',
        easyPay: '토스페이',
        useCardPoint: false,
      },
    });
  };

  const handlePaymentButton = async () => {
    isValid();
    handlePayment();
  };

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-[30px] pb-[30px] pt-[18px]'>
      <button
        type='button'
        onClick={handlePaymentButton}
        className='btn-primary'
      >
        42,000원 결제하기
      </button>
    </div>
  );
};

export default PaymentButton;
