import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useNavigate } from 'react-router-dom';
import ReservationBar from './components/ReservationBar';
import ImageCarousel from './components/ImageCarousel';
import RoomDetail from './components/RoomDetail';

const ReservationPage = () => {
  const navigate = useNavigate();
  return (
    <MainLayout>
      <HeaderOnlyTitle title='ROOM B' />
      <ReservationBar />
      <ImageCarousel />
      <RoomDetail />
      <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-[30px] pb-[30px] pt-[18px]'>
        <button
          type='button'
          className='btn-primary'
          onClick={() => navigate('/payment')}
        >
          예약하기
        </button>
      </div>
    </MainLayout>
  );
};

export default ReservationPage;
