import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import PlaceSearch from './components/PlaceSearch';
import SelectDate from './components/SelectDate/SelectDate';
import SelectTime from './components/SelectTime';

const Search = () => {
  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='검색' />
        <div className='flex flex-col gap-8'>
          <PlaceSearch />
          <SelectDate />
          <SelectTime />
          <SelectTime />
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default Search;
