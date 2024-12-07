import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import usePositionStore from '@store/positionStore';
import useAuthStore from '@store/authStore';
import { useEffect, useState } from 'react';
import { getRole } from '@utils/auth';
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
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (isLogin) {
      const role = getRole();
      if (role === 'ROLE_USER') {
        setIsUser(true);
      }
    }
  }, [isLogin]);

  console.log(isLogin);
  console.log(isUser);
  console.log('query', isLogin && !isUser);

  const {
    data: recommendData,
    isLoading: isRecommendLoading,
    isError: isRecommendError,
  } = useGetRecommendData(isLogin, isUser);
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
          isLogin={isLogin}
          isUser={isUser}
        />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
