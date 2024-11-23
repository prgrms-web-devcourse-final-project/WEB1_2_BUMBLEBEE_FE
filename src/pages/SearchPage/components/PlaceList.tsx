import { IoIosSubway, IoIosPin } from 'react-icons/io';
// import { SearchType } from '@typings/types';
import useSearchStore from '@store/searchStore';

export type Place = kakao.maps.services.PlacesSearchResultItem;

interface PlaceListProps {
  onShowList: (value: boolean) => void;
  showList: boolean;
  onSetSearchPlace: (value: string) => void;
  searchList: Place[];
}

const PlaceList = (props: PlaceListProps) => {
  const { onShowList, showList, onSetSearchPlace, searchList } = props;
  const { setPlace } = useSearchStore();
  const handleClickPlace = (placeName: string) => {
    onSetSearchPlace(placeName);
    setPlace(placeName);
    onShowList(!showList);
  };

  return (
    <>
      <div className='flex h-[160px] w-[330px] flex-col overflow-auto rounded-[10px] border border-subfont bg-white'>
        {searchList
          // .filter((item) => item.category_group_code === 'SW8')
          .map((map) => (
            <li
              key={map.place_name}
              className='flex h-[40px] cursor-pointer list-none items-center gap-2 border-b border-b-subfont px-2 py-3 text-sm last:border-none hover:bg-subfont hover:bg-opacity-50'
              onClick={() => handleClickPlace(map.place_name)}
            >
              {map.category_group_code === 'SW8' ? (
                <IoIosSubway className='text-lg text-[#454545]' />
              ) : (
                <IoIosPin className='text-lg text-[#454545]' />
              )}
              <div>
                <p className='font-normal'>{map.place_name}</p>
                <p className='text-xs text-subfont'>{map.address_name}</p>
              </div>
            </li>
          ))}
      </div>
    </>
  );
};

export default PlaceList;
