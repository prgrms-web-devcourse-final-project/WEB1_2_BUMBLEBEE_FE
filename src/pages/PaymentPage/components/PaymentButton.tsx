import {
  isValidKoreanName,
  isValidUserPhoneNumber,
} from '@utils/validationCheckRegex';
import { ERROR_MESSAGE } from '@constants/constants';
import type { ReservationFormData, ErrorMessageType } from '..';

interface PaymentButtonProps {
  reservationForm: ReservationFormData;
  onSetErrorMessage: (value: ErrorMessageType) => void;
}

const PaymentButton = (props: PaymentButtonProps) => {
  const { reservationForm, onSetErrorMessage } = props;

  const isValid = () => {
    const newError = {
      nameError: '',
      phonNumberError: '',
    };

    if (!isValidKoreanName(reservationForm.name)) {
      newError.nameError = ERROR_MESSAGE.name;
    }
    if (!isValidUserPhoneNumber(reservationForm.phoneNumber)) {
      newError.phonNumberError = ERROR_MESSAGE.phonNumber;
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
