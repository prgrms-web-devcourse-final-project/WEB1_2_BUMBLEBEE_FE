import BottomNavigation from '@layouts/BottomNavigation';
import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { SearchStudyRoom } from '@typings/types';
import useSearchStore from '@store/searchStore';
import { SyncLoader } from 'react-spinners';
import { useEffect } from 'react';
import ResultBar from './components/ResultBar';
import RoomCard from './components/RoomCard';
import { useGetSearchStudyRoom } from './hooks/useGetSearchStudyRoom';

const SearchResult = () => {
  const {
    searchDate,
    formattedTime,
    searchPeople: reservationCapacity,
    searchAddress: address,
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

  console.log(searchData);
  const { data, isLoading } = useGetSearchStudyRoom(searchData);
  console.log(data);

  // 스크롤 상단으로 이동
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

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
