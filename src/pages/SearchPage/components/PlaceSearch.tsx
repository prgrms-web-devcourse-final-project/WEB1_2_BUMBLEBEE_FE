import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AiOutlineSearch } from 'react-icons/ai';
import useSearchStore from '@store/searchStore';
import { debounce } from 'lodash';
import PlaceList, { Place } from './PlaceList';

const PlaceSearch = () => {
  const [showList, setShowList] = useState(false);
  const [searchList, setSearchList] = useState<Place[]>([]);
  const { searchPlace, setPlace } = useSearchStore();
  const isClickRef = useRef(false);

  const handleSearchPlace = useCallback(() => {
    if (!searchPlace) return;
    setShowList(true);
    const ps = new kakao.maps.services.Places();
    ps.keywordSearch(searchPlace, (data, status) => {
      if (status === kakao.maps.services.Status.OK) {
        setSearchList(data);
        console.log(data);
      } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
        console.log('검색 결과가 존재하지 않습니다.');
        setSearchList([]);
      } else if (status === kakao.maps.services.Status.ERROR) {
        console.log('검색 결과 중 오류가 발생했습니다.');
      }
    });
  }, [searchPlace]);

  const debouncedSearch = useMemo(
    () => debounce(handleSearchPlace, 300),
    [handleSearchPlace],
  );

  useEffect(() => {
    if (searchPlace && !isClickRef.current) {
      debouncedSearch();
    } else {
      setSearchList([]);
      setShowList(false);
    }
    return () => {
      debouncedSearch.cancel();
    };
  }, [debouncedSearch, searchPlace]);

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
            onChange={(e) => setPlace(e.target.value)}
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
          searchList={searchList}
          isClickRef={isClickRef}
        />
      )}
    </div>
  );
};

export default PlaceSearch;
