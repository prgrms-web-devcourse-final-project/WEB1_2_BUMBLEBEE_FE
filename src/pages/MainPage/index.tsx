import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import usePositionStore from '@store/positionStore';
import useAuthStore from '@store/authStore';
import { useEffect, useState } from 'react';
import {
  getRole,
  getTokenExpiration,
  removeAuthToken,
  removeRole,
} from '@utils/auth';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';
import {
  useGetWorkplaceData,
  useGetRecommendData,
} from './hooks/useGetWorkplaceData';

const MainPage = () => {
  const { mapPosition, nowPosition, centerPosition } = usePositionStore();

  const position = {
    latitude: nowPosition.center.lat,
    longitude: nowPosition.center.lng,
  };

  // 위치별 조회 데이터
  const { data, isLoading, isError } = useGetWorkplaceData(
    position,
    mapPosition,
    centerPosition,
  );

  // 비로그인 / 사업자 / 사용자 확인
  const { isLogin, storeLogout } = useAuthStore();
  const [isUser, setIsUser] = useState<boolean>(false);

  // 토큰 만료 확인
  useEffect(() => {
    const isExpiration = getTokenExpiration();
    if (isExpiration && isExpiration < new Date().getTime()) {
      removeAuthToken();
      removeRole();
      storeLogout();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (isLogin) {
      const role = getRole();
      if (role === 'ROLE_USER') {
        setIsUser(true);
      }
    }
  }, [isLogin]);

  // 선택한 탭
  const [activeTab, setActiveTab] = useState('주변 스터디룸');

  // 사업장 추천 데이터
  const {
    data: recommendData,
    isLoading: isRecommendLoading,
    isError: isRecommendError,
  } = useGetRecommendData(isLogin, isUser, activeTab);

  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap
          data={data}
          activeTab={activeTab}
          recommendData={recommendData}
        />
        <MainList
          activeTab={activeTab}
          OnSetActiveTab={setActiveTab}
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
