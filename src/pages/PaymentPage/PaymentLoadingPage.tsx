import { postPaymentsSuccess } from '@apis/reservation';
import MainLayout from '@layouts/MainLayout';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const PaymentLoadingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    const paymentsSuccess = async () => {
      if (requestData.orderId && requestData.amount && requestData.paymentKey) {
        const response = await postPaymentsSuccess({
          orderId: requestData.orderId,
          amount: Number(requestData.amount),
          paymentKey: requestData.paymentKey,
        });
        navigate('/payment-success', { state: response });
      } else {
        throw new Error('결제에 필요한 값이 누락되었습니다.');
      }
    };

    paymentsSuccess();
  }, [navigate, searchParams]);

  return (
    <>
      <MainLayout>
        <div className='mx-auto -mt-[93px] flex h-[100vh] flex-col items-center justify-center gap-6'>
          <div className='flex w-custom flex-col items-center justify-center gap-5'>
            <FadeLoader color='#50BEAD' />
            <div className='text-xl font-medium'>결제 승인 중입니다.</div>
          </div>
        </div>
      </MainLayout>
    </>
  );
};

export default PaymentLoadingPage;
