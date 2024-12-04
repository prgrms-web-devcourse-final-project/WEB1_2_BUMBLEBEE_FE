import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useNavigate, useSearchParams } from 'react-router-dom';
import ReservationBar from './components/ReservationBar';
import ImageCarousel from './components/ImageCarousel';
import RoomDetail from './components/RoomDetail';

const ReservationPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const studyroomId = Number(searchParams.get('studyroomId'));
  // const { data } = useGetStudyroomDetail(studyroomId);
  const data = {
    studyRoomId: 1,
    workplaceId: 1,
    workplaceName: '타임유스터디카페 민락점',
    studyRoomName: 'Room A',
    description: '조용하고 쾌적한 환경, 최대 4인 가능',
    imageUrl: [
      'https://elasticbeanstalk-ap-northeast-2-405894845535.s3.ap-northeast-2.amazonaws.com/타임유스터디카페 민락점/Room A/Room A-1.jpg',
      'https://elasticbeanstalk-ap-northeast-2-405894845535.s3.ap-northeast-2.amazonaws.com/타임유스터디카페 민락점/Room A/Room A-2.jpg',
    ],
    price: 7000,
    capacity: 4,
  };

  return (
    <MainLayout>
      <HeaderOnlyTitle title={data?.studyRoomName || '스터디룸'} />
      <ReservationBar studyroomId={studyroomId} />
      <ImageCarousel data={data} />
      <RoomDetail data={data} />
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
