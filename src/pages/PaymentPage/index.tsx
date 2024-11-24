import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import PaymentRoomCard from './components/PaymentRoomCard';
import ReservationInfo from './components/ReservationInfo';
import CancelRule from './components/CancelRule';
import ReservationGuide from './components/ReservationGuide';
import ReservationPrice from './components/ReservationPrice';
import PaymentAgree from './components/PaymentAgree';

const PaymentPage = () => {
  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='예약 확인 및 결제' />
        <div className='flex h-auto flex-col gap-4 pb-[110px]'>
          <PaymentRoomCard />
          <ReservationInfo />
          <CancelRule />
          <ReservationGuide />
          <ReservationPrice />
          <PaymentAgree />
        </div>
        <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-[30px] pb-[30px] pt-[18px]'>
          <button
            type='button'
            className='btn-primary'
          >
            42,000원 결제하기
          </button>
        </div>
      </MainLayout>
    </>
  );
};

export default PaymentPage;
