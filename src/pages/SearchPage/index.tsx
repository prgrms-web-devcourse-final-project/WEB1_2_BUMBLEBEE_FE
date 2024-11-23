import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import { useState } from 'react';
import { SearchType } from '@typings/types';
import PlaceSearch from './components/PlaceSearch';
import SelectDate from './components/SelectDate/SelectDate';
import SelectTime from './components/SelectTime';
import SelectPeople from './components/SelectPeople';

const Search = () => {
  const [searchValue, setSearchValue] = useState<SearchType>({
    place: '',
    date: new Date(),
    time: [],
    people: 0,
  });

  console.log(searchValue);

  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='검색' />
        <div className='relative flex h-auto flex-col items-center gap-8 pb-[100px]'>
          <PlaceSearch
            searchValue={searchValue}
            onSetSearchValue={setSearchValue}
          />
          <SelectDate
            searchValue={searchValue}
            onSetSearchValue={setSearchValue}
          />
          <SelectTime
            searchValue={searchValue}
            onSetSearchValue={setSearchValue}
          />
          <SelectPeople
            searchValue={searchValue}
            onSetSearchValue={setSearchValue}
          />
          <button
            type='button'
            className='btn-primary mb-4'
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
