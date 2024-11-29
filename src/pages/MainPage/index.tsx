import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import { useState } from 'react';
import { MapPosition } from '@typings/types';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';
import { useGetWorkplaceData } from './hooks/useGetWorkplaceData';

export interface Position {
  center: {
    lat: number;
    lng: number;
  };
  errMsg: string;
  isLoading: boolean;
}

const MainPage = () => {
  const [mapPosition, setMapPosition] = useState<MapPosition>({
    topRight: { lat: 0, lng: 0 },
    bottomLeft: { lat: 0, lng: 0 },
  });

  const [position, setPosition] = useState({
    center: {
      lat: 37.496486063,
      lng: 127.028361548,
    },
    errMsg: '',
    isLoading: true,
  });

  const nowPosition = {
    latitude: position.center.lat,
    longitude: position.center.lng,
  };

  const { data } = useGetWorkplaceData(nowPosition, mapPosition);
  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap
          position={position}
          onSetPosition={setPosition}
          mapPosition={mapPosition}
          onSetMapPosition={setMapPosition}
          data={data}
        />
        <MainList data={data} />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
