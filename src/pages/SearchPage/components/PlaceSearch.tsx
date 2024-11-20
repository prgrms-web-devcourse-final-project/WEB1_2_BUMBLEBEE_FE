import { AiOutlineSearch } from 'react-icons/ai';

const PlaceSearch = () => {
  return (
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
          className='main-input text-sm'
        />
        <AiOutlineSearch className='absolute right-[18px] top-[14.5px] h-[18px] w-[18px] cursor-pointer' />
      </div>
    </div>
  );
};

export default PlaceSearch;
