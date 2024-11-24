import MainLayout from '@layouts/MainLayout';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import BottomNavigation from '@layouts/BottomNavigation';
import MainList from './components/MainList';
import KakaoMap from './components/KakaoMap';

const MainPage = () => {
  const studyRoomExample = [
    {
      workPlaceId: 1,
      businessId: 309,
      workplaceName: '타임유스터디카페 민락점',
      workplaceImage:
        'https://search.pstatic.net/common/?src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20231218_94%2F1702881416770IHqB6_JPEG%2Ffocus1.JPG',
      workPlacePhoneNumber: '010-2666-4762',
      workPlaceDescription: '의정부 민락동에 위치한 스터디룸',
      workPlaceAddress: '경기 의정부시 용현로105번길 19 완빌딩',
      workPlaceStartTime: '2024-06-08T09:00:00',
      workPlaceEndTime: '2024-06-08T23:00:00',
      createdAt: '2024-06-07T12:42:11',
      updateAt: '2024-06-07T12:42:11',
      starSum: 4,
    },
    {
      workPlaceId: 2,
      businessId: 511,
      workplaceName: '타임유스터디카페 망월사역점',
      workplaceImage:
        'https://search.pstatic.net/common/?src=https%3A%2F%2Fpup-review-phinf.pstatic.net%2FMjAyMzEwMTZfMjc2%2FMDAxNjk3MzgzNDI1NjQz.aEqLbREqc0WCz2b68vkjm_XYVvLVwgzgHraaYWyfvekg.lYdNs4Bwc7FP0GX5GYbW-GD7-kJja96OFoiQDIjTUWcg.JPEG%2Fupload_31fe1a883e90afdbbb1320bbc108003b.jpg%3Ftype%3Dw1500_60_sharpen',
      workPlacePhoneNumber: '0507-1344-2478',
      workPlaceDescription: '의정부 망월사역에 위치한 스터디룸',
      workPlaceAddress: '경기 의정부시 평화로 170',
      workPlaceStartTime: '2024-06-08T09:00:00',
      workPlaceEndTime: '2024-06-08T23:00:00',
      createdAt: '2023-06-07T12:42:11',
      updateAt: '2023-06-07T12:42:11',
      starSum: 3.5,
    },
  ];

  return (
    <>
      <MainLayout>
        <HeaderNoTitle />
        <KakaoMap data={studyRoomExample} />
        <MainList data={studyRoomExample} />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default MainPage;
