import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import { useEffect } from 'react';
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

  // 스크롤 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
