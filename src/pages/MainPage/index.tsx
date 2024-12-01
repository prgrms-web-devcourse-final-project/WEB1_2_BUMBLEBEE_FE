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

  const { data, refetch } = useGetWorkplaceData(nowPosition, mapPosition);

  console.log(data);
  // const data = {
  //   workplaces: [
  //     {
  //       workplaceId: 4,
  //       workplaceName: '옐로스톤 스터디룸',
  //       workplaceAddress: '서울 강남구 강남대로94길 21',
  //       imageUrl:
  //         'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20150901_244%2F14410338887412ja3X_JPEG%2FSUBMIT_1416958175779_35966443.jpg',
  //       stars: 4.0,
  //       reviewCount: 30,
  //       positionLat: 37.4997243135104,
  //       positionLon: 127.02896610336,
  //       distance: 1.57,
  //     },
  //     {
  //       workplaceId: 3,
  //       workplaceName: '영글 강남스터디룸',
  //       workplaceAddress: '서울 강남구 학동로1길 19 금성빌딩 5층',
  //       imageUrl:
  //         'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20240808_204%2F1723106102664gSDVA_JPEG%2FIMG_2165.jpeg',
  //       stars: 3.0,
  //       reviewCount: 50,
  //       positionLat: 37.5126594626812,
  //       positionLon: 127.02157831586,
  //       distance: 9.49,
  //     },
  //     {
  //       workplaceId: 2,
  //       workplaceName: '타임유스터디카페 망월사역점',
  //       workplaceAddress: '경기 의정부시 평화로 170',
  //       imageUrl:
  //         'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzEwMTZfMjc2%2FMDAxNjk3MzgzNDI1NjQz.aEqLbREqc0WCz2b68vkjm_XYVvLVwgzgHraaYWyfvekg.lYdNs4Bwc7FP0GX5GYbW-GD7-kJja96OFoiQDIjTUWcg.JPEG%2Fupload_31fe1a883e90afdbbb1320bbc10',
  //       stars: 3.3333333333333335,
  //       reviewCount: 30,
  //       positionLat: 37.706967295248,
  //       positionLon: 127.048476534971,
  //       distance: 23.108376076947753,
  //     },
  //   ],
  // };

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
          refetch={refetch}
        />
        <MainList data={data} />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
