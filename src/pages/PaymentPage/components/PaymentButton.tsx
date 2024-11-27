import {
  isValidKoreanName,
  isValidUserPhoneNumber,
} from '@utils/validationCheckRegex';
import { ERROR_MESSAGE } from '@constants/constants';
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

  const handlePaymentButton = () => {
    isValid();
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
