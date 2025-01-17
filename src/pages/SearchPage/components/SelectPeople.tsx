import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import useSearchStore from '@store/searchStore';
import { useLocation } from 'react-router-dom';
import { useEffect } from 'react';

const SelectPeople = () => {
  const { searchPeople, setPeople } = useSearchStore();

  const handleCountClick = (count: string) => {
    if (count === 'decrease' && searchPeople > 0) {
      setPeople(searchPeople - 1);
    } else if (count === 'increase') {
      setPeople(searchPeople + 1);
    }
  };

  const location = useLocation();
  const isBack = location.state || false;

  useEffect(() => {
    if (!isBack) {
      setPeople(0);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isBack]);

  return (
    <div className='flex w-custom items-center justify-between gap-[4px]'>
      <label
        htmlFor='place'
        className='flex h-[32px] w-auto items-center px-[6px] font-normal'
      >
        인원수
      </label>
      <div className='flex h-[36px] w-[94px] items-center justify-center gap-[20px] rounded-[5px] border-[1px] border-subfont text-xs'>
        <button
          type='button'
          className='hover:text-primary'
          onClick={() => handleCountClick('decrease')}
        >
          <AiOutlineMinus />
        </button>
        <span className='w-2 text-sm font-normal'>{searchPeople}</span>
        <button
          type='button'
          className='hover:text-primary'
          onClick={() => handleCountClick('increase')}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default SelectPeople;
