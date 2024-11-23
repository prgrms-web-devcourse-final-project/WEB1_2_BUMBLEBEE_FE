import { useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
// import { SearchType } from '@typings/types';
import useSearchStore from '@store/searchStore';
import PlaceList, { Place } from './PlaceList';

// interface PlaceSearchProps {
//   searchValue: SearchType;
//   onSetSearchValue: (value: SearchType) => void;
// }

const PlaceSearch = () => {
  // const { searchValue, onSetSearchValue } = props;
  const [searchPlace, setSearchPlace] = useState('');
  const [showList, setShowList] = useState(false);
  const [searchList, setSearchList] = useState<Place[]>([]);
  const { setPlace } = useSearchStore();

  const handleSearchPlace = () => {
    setShowList(true);
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, (data, status, _pagination) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchList(data);
        setPlace(searchPlace);
        console.log(data);
        console.log(_pagination);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        console.log('검색 결과가 존재하지 않습니다.');
      } else if (status === kakao.maps.services.Status.ERROR) {
        console.log('검색 결과 중 오류가 발생했습니다.');
      }
    });
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearchPlace();
    }
  };

  return (
    <div className='flex flex-col gap-4'>
      <div className='flex flex-col gap-[4px]'>
        <label
          htmlFor='place'
          className='h-[32px] w-custom px-[6px] font-normal'
        >
          장소 선택
        </label>
        <div className='relative flex w-[330px]'>
          <input
            id='place'
            type='text'
            placeholder='장소 검색'
            value={searchPlace}
            onChange={(e) => setSearchPlace(e.target.value)}
            onKeyDown={handleKeyDown}
            className='main-input text-sm'
          />
          <AiOutlineSearch
            className='absolute right-[18px] top-[14.5px] h-[18px] w-[18px] cursor-pointer'
            onClick={handleSearchPlace}
          />
        </div>
      </div>
      {showList && (
        <PlaceList
          onShowList={setShowList}
          showList={showList}
          onSetSearchPlace={setSearchPlace}
          searchList={searchList}
        />
      )}
    </div>
  );
};

export default PlaceSearch;
