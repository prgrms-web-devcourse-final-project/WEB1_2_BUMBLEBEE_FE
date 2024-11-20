import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import PlaceSearch from './components/PlaceSearch';
import SelectDate from './components/SelectDate/SelectDate';
import SelectTime from './components/SelectTime';
import SelectPeople from './components/SelectPeople';

const Search = () => {
  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='검색' />
        <div className='relative flex h-auto flex-col items-center gap-8 pb-[94px]'>
          <PlaceSearch />
          <SelectDate />
          <SelectTime />
          <SelectPeople />
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default Search;
