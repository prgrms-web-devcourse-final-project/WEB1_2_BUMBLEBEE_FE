import DetailTitle from '@components/DetailTitle';
import TossLogo from '@assets/icons/TossLogo.svg';
import type { ErrorMessageType, PayMethodType } from '..';

interface PaymentMethodProps {
  payMethod: PayMethodType;
  onSetPayMethod: (value: PayMethodType) => void;
  errorMessage: ErrorMessageType;
}

const PaymentMethod = (props: PaymentMethodProps) => {
  const { payMethod, onSetPayMethod, errorMessage } = props;
  return (
    <div className='mx-auto my-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='결제 수단 선택' />
      <div>
        <button
          type='button'
          className={`h-[60px] w-[150px] rounded-[10px] border bg-white px-4 py-4 ${
            payMethod === 'TOSS'
              ? 'border-primary shadow-custom'
              : 'border-[#c3c3c3]'
          }`}
          onClick={() => onSetPayMethod('TOSS')}
        >
          <img
            src={TossLogo}
            alt='토스페이 로고'
          />
        </button>
      </div>
      {errorMessage.payMethodError && (
        <div className='-mt-[6px] text-[12px] font-medium text-[#F83A3A]'>
          {errorMessage.payMethodError}
        </div>
      )}
    </div>
  );
};

export default PaymentMethod;
