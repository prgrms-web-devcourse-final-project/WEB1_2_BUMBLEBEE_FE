import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import PlaceSearch from './components/PlaceSearch';
import SelectDate from './components/SelectDate/SelectDate';
import SelectTime from './components/SelectTime';
import SelectPeople from './components/SelectPeople';

const Search = () => {
  const navigate = useNavigate();

  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='검색' />
        <div className='relative flex h-auto flex-col items-center gap-8 pb-[100px]'>
          <PlaceSearch />
          <SelectDate />
          <SelectTime />
          <SelectPeople />
          <button
            type='button'
            className='btn-primary mb-4'
            onClick={() => navigate('/search-result')}
          >
            검색하기
          </button>
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default Search;
