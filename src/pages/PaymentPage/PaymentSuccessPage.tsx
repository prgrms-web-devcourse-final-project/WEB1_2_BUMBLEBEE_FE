import MainLayout from '@layouts/MainLayout';
import { useLocation, useNavigate } from 'react-router-dom';

const PaymentSuccessPage = () => {
  const location = useLocation();
  const responseData = location.state;
  const navigate = useNavigate();

  const { orderName, totalAmount } = responseData;

  console.log('Response Data:', responseData);

  const formattedAmount = `${totalAmount.toLocaleString('ko-KR')}원`;

  return (
    <MainLayout>
      <div className='mx-auto -mt-[93px] flex h-[100vh] flex-col items-center justify-center gap-6'>
        <div className='flex w-custom flex-col items-center justify-center gap-3'>
          <div className='text-xl font-medium'>결제 완료</div>
          <div>결제가 정상적으로 처리되었습니다.</div>
          <div className='mt-3 flex w-[220px] flex-col gap-1 text-sm'>
            <div className='flex justify-between'>
              <p className='font-medium'>주문 상품</p>
              <p className='w-[150px] text-end'>{orderName}</p>
            </div>
            <div className='flex justify-between'>
              <p className='font-medium'>결제 금액</p>
              <p>{formattedAmount}</p>
            </div>
          </div>
        </div>
        <button
          type='button'
          className='flex h-[48px] w-[155px] items-center justify-center rounded-lg border border-primary py-[15px] text-primary'
          onClick={() => navigate('/reservation-list')}
        >
          결제 관리로 이동
        </button>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccessPage;
