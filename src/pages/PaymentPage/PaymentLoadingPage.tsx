import MainLayout from '@layouts/MainLayout';
import { FadeLoader } from 'react-spinners';

const PaymentLoadingPage = () => {
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
