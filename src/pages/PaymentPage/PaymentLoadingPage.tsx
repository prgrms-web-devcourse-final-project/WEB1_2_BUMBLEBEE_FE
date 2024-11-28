import MainLayout from '@layouts/MainLayout';
import axios from 'axios';
import { Buffer } from 'buffer';
import { useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FadeLoader } from 'react-spinners';

const secretKey = import.meta.env.VITE_APP_TOSS_SECRET_KEY;

const PaymentLoadingPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const paymentInstance = axios.create({
      baseURL: 'https://api.tosspayments.com',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`${secretKey}:`).toString('base64')}`,
      },
    });

    const requestData = {
      orderId: searchParams.get('orderId'),
      amount: searchParams.get('amount'),
      paymentKey: searchParams.get('paymentKey'),
    };

    const paymentConfirm = async () => {
      try {
        const response = await paymentInstance.post(
          '/v1/payments/confirm',
          requestData,
        );
        navigate('/payment-success', { state: response.data });
      } catch (error) {
        navigate('/payment-fail', { state: error });
      }
    };

    paymentConfirm();
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
