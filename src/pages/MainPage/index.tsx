import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import { useCallback, useState } from 'react';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';

const MainPage = () => {
  const [distanceList, setDistanceList] = useState<
    { id: string; distance: number }[]
  >([]);

  const handleDistanceChange = useCallback(
    (distanceData: { id: string; distance: number }[]) => {
      setDistanceList(distanceData);
    },
    [],
  );

  const studyRoomExample = [
    {
      workplaceName: '타임유스터디카페 민락점',
      WorkplacePhoneNumber: '010-2666-4762',
      workplaceDescription: '의정부 민락동에 위치한 스터디룸',
      workplaceAddress: '경기 의정부시 용현로105번길 19 완빌딩',
      imageUrl:
        'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231218_94%2F1702881416770IHqB6_JPEG%2Ffocus1.JPG',
      workplaceStartTime: '09:00',
      workplaceEndTime: '23:00',
    },
    {
      workplaceName: '타임유스터디카페 망월사역점',
      WorkplacePhoneNumber: '0507-1344-2478',
      workplaceDescription: '의정부 망월사역에 위치한 스터디룸',
      workplaceAddress: '경기 의정부시 평화로 170',
      imageUrl:
        'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzEwMTZfMjc2%2FMDAxNjk3MzgzNDI1NjQz.aEqLbREqc0WCz2b68vkjm_XYVvLVwgzgHraaYWyfvekg.lYdNs4Bwc7FP0GX5GYbW-GD7-kJja96OFoiQDIjTUWcg.JPEG%2Fupload_31fe1a883e90afdbbb1320bbc108003b.jpg%3Ftype%3Dw1500_60_sharpen',
      workplaceStartTime: '09:00',
      workplaceEndTime: '23:00',
    },
  ];

  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap
          data={studyRoomExample}
          onDistanceChange={handleDistanceChange}
        />
        <MainList
          data={studyRoomExample}
          distanceList={distanceList}
        />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
