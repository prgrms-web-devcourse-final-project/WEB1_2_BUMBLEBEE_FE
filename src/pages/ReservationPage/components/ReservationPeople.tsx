import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';
import useSearchStore from '@store/searchStore';
import { PossibleTime } from '@typings/types';

interface ReservationPeopleProps {
  data: PossibleTime;
}

const ReservationPeople = (props: ReservationPeopleProps) => {
  const { data } = props;
  const { searchPeople, setPeople } = useSearchStore();

  const handleCountClick = (count: string) => {
    if (count === 'decrease' && searchPeople > 0) {
      setPeople(searchPeople - 1);
    } else if (count === 'increase' && searchPeople < data.capacity) {
      setPeople(searchPeople + 1);
    }
  };

  return (
    <div className='absolute top-20 flex w-custom items-center justify-between gap-[4px] rounded-[10px] bg-white px-2 py-3 shadow-custom'>
      <label
        htmlFor='place'
        className='flex h-[32px] w-auto items-center px-[6px] font-normal'
      >
        인원수
      </label>
      <div className='flex h-[36px] w-[94px] items-center justify-center gap-[20px] rounded-[5px] border-[1px] border-subfont bg-white text-xs'>
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

export default ReservationPeople;
