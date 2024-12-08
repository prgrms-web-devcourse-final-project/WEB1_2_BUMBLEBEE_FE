import { Room } from '@typings/types';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface CountPeopleProps {
  room: Room;
  updateRoomData: (data: Partial<Room>) => void;
}

const CountPeople = ({ room, updateRoomData }: CountPeopleProps) => {
  const handleDecrease = () => {
    if (room.people > 0) {
      updateRoomData({ people: room.people - 1 });
    }
  };
  const handleIncrease = () => {
    updateRoomData({ people: room.people + 1 });
  };

  return (
    <div className='flex items-center'>
      <label
        htmlFor='people'
        className='text-[14px] font-normal'
      >
        인원수
      </label>
      <div className='ml-[20px] flex h-[38px] w-[84px] items-center justify-center gap-[20px] rounded-[5px] border-[1px] border-subfont px-[13px] py-[10px] text-xs'>
        <button
          type='button'
          className='hover:text-primary'
          onClick={handleDecrease}
        >
          <AiOutlineMinus />
        </button>
        <span className='w-2 text-sm font-normal'>{room?.people}</span>
        <button
          type='button'
          className='hover:text-primary'
          onClick={handleIncrease}
        >
          <AiOutlinePlus />
        </button>
      </div>
    </div>
  );
};

export default CountPeople;
