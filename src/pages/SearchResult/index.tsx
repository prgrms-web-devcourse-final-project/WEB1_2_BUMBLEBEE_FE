import BottomNavigation from '@layouts/BottomNavigation';
import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { SearchStudyRoom } from '@typings/types';
import useSearchStore from '@store/searchStore';
import { SyncLoader } from 'react-spinners';
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

  const startDateTime = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')}T${formattedTime[0]}:00`;
  const endDateTime = `${searchDate.getFullYear()}-${(searchDate.getMonth() + 1).toString().padStart(2, '0')}-${searchDate.getDate().toString().padStart(2, '0')}T${formattedTime[1]}:00`;

  const searchData: SearchStudyRoom = {
    address,
    startDateTime,
    endDateTime,
    reservationCapacity,
  };

  const { data, isLoading } = useGetSearchStudyRoom(searchData);

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
