import BottomNavigation from '@layouts/BottomNavigation';
import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { SearchStudyRoom } from '@typings/types';
import useSearchStore from '@store/searchStore';
import ResultBar from './components/ResultBar';
import RoomCard from './components/RoomCard';
import { useGetSearchStudyRoom } from './hooks/useGetSearchStudyRoom';
import { SyncLoader } from 'react-spinners';

const SearchResult = () => {
  const {
    searchPlace: address,
    searchDate,
    formattedTime,
    searchPeople: reservationCapacity,
  } = useSearchStore();

  const startTimeString = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')} ${formattedTime[0]}`;
  const endTimeString = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')} ${formattedTime[1]}`;

  const startDateTime = new Date(startTimeString);
  const endDateTime = new Date(endTimeString);

  const searchData: SearchStudyRoom = {
    address,
    startDateTime,
    endDateTime,
    reservationCapacity,
  };
  // const { data, isLoading } = useGetSearchStudyRoom(searchData);
  const isLoading = false;
  const data = [
    {
      workplaceName: '타임유스터디카페 민락점',
      studyRoomName: 'Room B',
      reviewScore: 3.7142857142857144,
      reviewCount: 7,
      workplaceAddress: '경기 의정부시 용현로105번길 19, 완빌딩 2층',
      studyRoomCapacity: 6,
      studyRoomPrice: 8000,
      imageUrl:
        'https://elasticbeanstalk-ap-northeast-2-405894845535.s3.ap-northeast-2.amazonaws.com/타임유스터디카페 민락점/타임유 스터디카페.jpg',
      distance: 0.0,
    },
    {
      workplaceName: '타임유스터디카페 민락점',
      studyRoomName: 'Room C',
      reviewScore: 3.7142857142857144,
      reviewCount: 7,
      workplaceAddress: '경기 의정부시 용현로105번길 19, 완빌딩 2층',
      studyRoomCapacity: 3,
      studyRoomPrice: 6000,
      imageUrl:
        'https://elasticbeanstalk-ap-northeast-2-405894845535.s3.ap-northeast-2.amazonaws.com/타임유스터디카페 민락점/타임유 스터디카페.jpg',
      distance: 0.0,
    },
    {
      workplaceName: '타임유스터디카페 망월사역점',
      studyRoomName: 'Quiet Room 1',
      reviewScore: 3.3333333333333335,
      reviewCount: 30,
      workplaceAddress: '경기 의정부시 평화로 170, 빌딩 3층 301호',
      studyRoomCapacity: 8,
      studyRoomPrice: 10000,
      imageUrl:
        'https://elasticbeanstalk-ap-northeast-2-405894845535.s3.ap-northeast-2.amazonaws.com/타임유스터디카페 망월사역점/타임유스터디카페 망월사역점.jpg',
      distance: 5.19,
    },
    {
      workplaceName: '타임유스터디카페 망월사역점',
      studyRoomName: 'Meeting Room',
      reviewScore: 3.3333333333333335,
      reviewCount: 30,
      workplaceAddress: '경기 의정부시 평화로 170, 빌딩 3층 301호',
      studyRoomCapacity: 12,
      studyRoomPrice: 15000,
      imageUrl:
        'https://elasticbeanstalk-ap-northeast-2-405894845535.s3.ap-northeast-2.amazonaws.com/타임유스터디카페 망월사역점/타임유스터디카페 망월사역점.jpg',
      distance: 5.19,
    },
  ];
  return (
    <>
      <MainLayout headerType='both'>
        <HeaderWithTitle title='검색 결과' />
        <ResultBar />
        <div className='mt-4 flex h-auto flex-col pb-[94px]'>
          {isLoading && (
            <div className='flex h-[300px] w-full items-center justify-center'>
              <SyncLoader color='#50BEAD' />
            </div>
          )}
          {!isLoading && data.length === 0 && (
            <div className='flex h-[300px] w-full items-center justify-center text-[14px] font-normal text-subfont'>
              검색 결과가 없습니다.
            </div>
          )}
          {data &&
            data.length > 0 &&
            data.map((item) => (
              <RoomCard
                item={item}
                key={item.studyRoomName}
              />
            ))}
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default SearchResult;
