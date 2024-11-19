import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap />
        <MainList />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
