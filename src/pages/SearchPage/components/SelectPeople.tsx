import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const SelectPeople = () => {
  const [people, setPeople] = useState(0);

  const handleCountClick = (count: string) => {
    if (count === 'decrease' && people > 0) {
      setPeople((prev) => prev - 1);
    } else if (count === 'increase') {
      setPeople((prev) => prev + 1);
    }
  };

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
        <span className='w-2 text-sm font-normal'>{people}</span>
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
