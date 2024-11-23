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
  // const location = useLocation();
  // const { place, date, time, people, setPlace, setDate, setTime, setPeople } =
  //   useSearchStore();
  // const [searchValue, setSearchValue] = useState<SearchType>({
  //   place,
  //   date,
  //   time,
  //   people,
  // });

  // console.log(searchValue);

  // if (location.state?.fromBack) {
  //   const existingSearch = { ...location.state };
  //   setSearchValue({
  //     ...searchValue,
  //     place: existingSearch.place,
  //     date: new Date(existingSearch.date),
  //     people: existingSearch.people,
  //   });
  // }

  // const handleSearchClick = () => {
  //   navigate('/search-result', {
  //     state: {
  //       place: `${searchValue.place}`,
  //       date: `${searchValue.date}`,
  //       time: `${searchValue.time}`,
  //       people: `${searchValue.people}`,
  //     },
  //   });
  // };

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
