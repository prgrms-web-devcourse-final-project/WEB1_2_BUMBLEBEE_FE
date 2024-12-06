import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import usePositionStore from '@store/positionStore';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';
import useGetWorkplaceData from './hooks/useGetWorkplaceData';

const MainPage = () => {
  const { mapPosition, nowPosition } = usePositionStore();

  const position = {
    latitude: nowPosition.center.lat,
    longitude: nowPosition.center.lng,
  };

  const { data, isLoading, isError } = useGetWorkplaceData(
    position,
    mapPosition,
  );

  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap data={data} />
        <MainList
          data={data}
          isLoading={isLoading}
          isError={isError}
        />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
