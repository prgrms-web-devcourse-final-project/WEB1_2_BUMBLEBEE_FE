import { useState } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

const CountPeople = () => {
  const [people, setPeople] = useState(0);

  const handleCountClick = (count: string) => {
    if (count === 'decrease' && people > 0) {
      setPeople((prev) => prev - 1);
    } else if (count === 'increase') {
      setPeople((prev) => prev + 1);
    }
  };

  return (
    <div className='flex items-center'>
      <label
        htmlFor='people'
        className='text-[14px] font-normal'
      >
        인원수
      </label>
      <div className='ml-[30px] flex h-[38px] w-[84px] items-center justify-center gap-[20px] rounded-[5px] border-[1px] border-subfont px-[13px] py-[10px] text-xs'>
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

export default CountPeople;
