import MainLayout from '@layouts/MainLayout';

const PaymentSuccessPage = () => {
  return (
    <MainLayout>
      <div className='mx-auto -mt-[93px] flex h-[100vh] flex-col items-center justify-center gap-6'>
        <div className='flex w-custom flex-col items-center justify-center gap-3'>
          <div className='text-xl font-medium'>결제 완료</div>
          <div>결제가 정상적으로 처리되었습니다.</div>
        </div>
        <button
          type='button'
          className='flex h-[48px] w-[155px] items-center justify-center rounded-lg border border-primary py-[15px] text-primary'
        >
          결제 관리로 이동
        </button>
      </div>
    </MainLayout>
  );
};

export default PaymentSuccessPage;
