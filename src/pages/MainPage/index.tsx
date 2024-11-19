import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import Map from './components/Map';
import MainList from './components/MainList';

const MainPage = () => {
  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <Map />
        <MainList />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
