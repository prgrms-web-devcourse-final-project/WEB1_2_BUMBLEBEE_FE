import BottomNavigation from '@layouts/BottomNavigation';
import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import ResultBar from './components/ResultBar';
import RoomCard from './components/RoomCard';

const SearchResult = () => {
  return (
    <>
      <MainLayout headerType='both'>
        <HeaderWithTitle title='검색 결과' />
        <ResultBar />
        <div className='mt-4 flex h-auto flex-col pb-[94px]'>
          <RoomCard />
          <RoomCard />
          <RoomCard />
          <RoomCard />
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default SearchResult;
