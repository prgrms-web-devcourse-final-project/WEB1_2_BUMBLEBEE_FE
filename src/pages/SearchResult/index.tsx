import BottomNavigation from '@layouts/BottomNavigation';
import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import ResultBar from './components/ResultBar';

const SearchResult = () => {
  return (
    <>
      <MainLayout headerType='both'>
        <HeaderWithTitle title='검색 결과' />
        <ResultBar />
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default SearchResult;
