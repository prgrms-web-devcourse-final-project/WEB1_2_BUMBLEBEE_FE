import BottomNavigation from '@layouts/BottomNavigation';
import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import { useLocation } from 'react-router-dom';
import ResultBar from './components/ResultBar';
import RoomCard from './components/RoomCard';

const SearchResult = () => {
  const location = useLocation();
  const searchInfo = { ...location.state };
  return (
    <>
      <MainLayout headerType='both'>
        <HeaderWithTitle title='검색 결과' />
        <ResultBar searchInfo={searchInfo} />
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
