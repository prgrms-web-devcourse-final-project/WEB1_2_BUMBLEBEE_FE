import CheckAgree from '@components/CheckAgree';
import DetailTitle from '@components/DetailTitle';
import type { CheckState, ErrorMessageType } from '..';

interface PaymentAgreeProps {
  checkState: CheckState;
  onSetCheckState: (value: CheckState) => void;
  errorMessage: ErrorMessageType;
}

const PaymentAgree = (props: PaymentAgreeProps) => {
  const { checkState, onSetCheckState, errorMessage } = props;

  const handlePrivacyPolicyClick = () => {
    window.location.href = 'https://pages.tosspayments.com/terms/privacy';
  };

  const handleCheckItem = (checked: boolean, id: string) => {
    if (checked) {
      onSetCheckState({
        ...checkState,
        payment: [...checkState.payment, id],
      });
    } else {
      onSetCheckState({
        ...checkState,
        payment: checkState.payment.filter((item) => item !== id),
      });
    }
  };

  const isChecked = (id: string) => checkState.payment.includes(id);

  return (
    <div className='mx-auto mt-8 flex w-custom flex-col gap-4'>
      <DetailTitle title='주문 내용 확인 및 결제 동의' />
      <div className='flex flex-col gap-2 text-xs'>
        <CheckAgree
          checkId='payment1'
          isCheck={isChecked('payment1')}
          description='결제 서비스 이용 약관'
          onChangeChecked={handleCheckItem}
        >
          <button
            type='button'
            className='text-subfont underline'
            onClick={handlePrivacyPolicyClick}
          >
            보기
          </button>
        </CheckAgree>
        <CheckAgree
          checkId='payment2'
          isCheck={isChecked('payment2')}
          description='주문정보 및 결제정보를 확인하였으며, 구매진행에 동의합니다.'
          onChangeChecked={handleCheckItem}
        />
      </div>
      {errorMessage.paymentCheckError && (
        <div className='-mt-[6px] text-[12px] font-medium text-[#F83A3A]'>
          {errorMessage.paymentCheckError}
        </div>
      )}
    </div>
  );
};

export default PaymentAgree;
