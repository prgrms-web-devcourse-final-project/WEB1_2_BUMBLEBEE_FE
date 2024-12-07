import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import usePositionStore from '@store/positionStore';
import useAuthStore from '@store/authStore';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';
import {
  useGetWorkplaceData,
  useGetRecommendData,
} from './hooks/useGetWorkplaceData';

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

  const { isLogin } = useAuthStore();

  const {
    data: recommendData,
    isLoading: isRecommendLoading,
    isError: isRecommendError,
  } = useGetRecommendData(isLogin);
  console.log(recommendData);

  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap data={data} />
        <MainList
          data={data}
          isLoading={isLoading}
          isError={isError}
          recommendData={recommendData}
          isRecommendLoading={isRecommendLoading}
          isRecommendError={isRecommendError}
        />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
