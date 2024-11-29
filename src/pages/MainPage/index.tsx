import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';

const MainPage = () => {
  const studyRoomExample = [
    {
      workplaceId: 1,
      workplaceName: 'Java Study Room',
      workplaceAddress: '서울 중구 장충단로 247 굿모닝시티 8층',
      imageUrl: 'http://example.com/java-room.jpg',
      stars: 3.0,
      reviewCount: 200,
      distance: 20.2,
    },
    {
      workplaceId: 2,
      workplaceName: 'Python Study Room',
      workplaceAddress: '서울 중구 을지로 227 훈련원공원',
      imageUrl: 'http://example.com/python-room.jpg',
      stars: 3.0,
      reviewCount: 200,
      distance: 20,
    },
  ];

  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap data={studyRoomExample} />
        <MainList data={studyRoomExample} />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
