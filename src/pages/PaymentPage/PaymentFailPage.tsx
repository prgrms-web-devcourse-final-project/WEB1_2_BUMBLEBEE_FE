import { getPaymentsFail } from '@apis/reservation';
import MainLayout from '@layouts/MainLayout';
import { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [errorMessage, setErrorMessage] = useState<string>('결제 실패');

  useEffect(() => {
    const requestData = {
      orderId: searchParams.get('orderId'),
      message: searchParams.get('message'),
      code: searchParams.get('code'),
    };

    const paymentsFail = async () => {
      if (requestData.orderId && requestData.message && requestData.code) {
        const response = await getPaymentsFail({
          orderId: requestData.orderId,
          message: requestData.message,
          code: requestData.code,
        });
        setErrorMessage(response.errorMessage);
      } else {
        throw new Error('필요한 값이 누락되었습니다.');
      }
    };

    paymentsFail();
  }, [navigate, searchParams]);

  return (
    <MainLayout>
      <div className='mx-auto -mt-[93px] flex h-[100vh] flex-col items-center justify-center gap-6'>
        <div className='flex w-custom flex-col items-center justify-center gap-3'>
          <div className='text-xl font-medium'>결제 실패</div>
          <div>{errorMessage}</div>
        </div>
        <button
          type='button'
          className='flex h-[48px] w-[155px] items-center justify-center rounded-lg border border-primary py-[15px] text-primary'
          onClick={() => navigate('/')}
        >
          메인으로 이동
        </button>
      </div>
    </MainLayout>
  );
};

export default PaymentFailPage;
