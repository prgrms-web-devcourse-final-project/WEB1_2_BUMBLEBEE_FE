import MainLayout from '@layouts/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentFailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const responseData = location.state;

  console.log('Response Data:', responseData);
  return (
    <MainLayout>
      <div className='mx-auto -mt-[93px] flex h-[100vh] flex-col items-center justify-center gap-6'>
        <div className='flex w-custom flex-col items-center justify-center gap-3'>
          <div className='text-xl font-medium'>결제 실패</div>
          <div>{responseData.message}</div>
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
