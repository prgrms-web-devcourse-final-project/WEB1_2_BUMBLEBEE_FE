import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import { useNavigate } from 'react-router-dom';
import useSearchStore from '@store/searchStore';
import { toast } from 'react-toastify';
import { ERROR_MESSAGE } from '@constants/constants';
import PlaceSearch from './components/PlaceSearch';
import SelectDate from './components/SelectDate/SelectDate';
import SelectTime from './components/SelectTime';
import SelectPeople from './components/SelectPeople';

const Search = () => {
  const navigate = useNavigate();
  const { searchAddress, searchDate, searchTime, searchPeople } =
    useSearchStore();

  const handleClickSearch = () => {
    if (!searchAddress) {
      toast.error(ERROR_MESSAGE.place);
      return;
    }
    if (!searchDate) {
      toast.error(ERROR_MESSAGE.date);
      return;
    }
    if (searchTime.length === 0) {
      toast.error(ERROR_MESSAGE.time);
      return;
    }
    if (!searchPeople) {
      toast.error(ERROR_MESSAGE.people);
      return;
    }

    navigate('/search-result');
  };

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
            onClick={handleClickSearch}
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
