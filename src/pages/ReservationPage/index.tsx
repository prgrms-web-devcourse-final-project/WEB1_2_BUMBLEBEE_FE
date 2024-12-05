import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useNavigate, useParams } from 'react-router-dom';
import useSearchStore from '@store/searchStore';
import { toast } from 'react-toastify';
import { ERROR_MESSAGE } from '@constants/constants';
import ReservationBar from './components/ReservationBar';
import ImageCarousel from './components/ImageCarousel';
import RoomDetail from './components/RoomDetail';
import useGetStudyroomDetail from './hooks/useGetStudyroomDetail';

const ReservationPage = () => {
  const navigate = useNavigate();
  const { studyroomId } = useParams<{ studyroomId: string }>();
  const { data } = useGetStudyroomDetail(Number(studyroomId));
  const { searchTime, searchPeople } = useSearchStore();

  const studyRoomInfo = {
    studyRoomId: studyroomId,
    workplaceName: data.workplaceName,
    studyRoomTitle: data.studyRoomName,
    studyRoomPrice: data.price,
  };

  const handleClickReservation = () => {
    if (searchTime.length === 0) {
      toast.error(ERROR_MESSAGE.time);
      return;
    }
    if (searchPeople === 0) {
      toast.error(ERROR_MESSAGE.people);
      return;
    }
    navigate('/payment', { state: studyRoomInfo });
  };

  return (
    <MainLayout>
      <HeaderOnlyTitle title={data?.studyRoomName || '스터디룸'} />
      <ReservationBar studyroomId={Number(studyroomId)} />
      <ImageCarousel data={data} />
      <RoomDetail data={data} />
      <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-[30px] pb-[30px] pt-[18px]'>
        <button
          type='button'
          className='btn-primary'
          onClick={handleClickReservation}
        >
          예약하기
        </button>
      </div>
    </MainLayout>
  );
};

export default ReservationPage;
