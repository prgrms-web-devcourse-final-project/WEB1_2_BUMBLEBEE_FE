import { Dispatch, SetStateAction } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

interface RoomForm {
  roomName: string;
  description: string;
  price: string;
  people: number;
}

interface CountPeopleProps {
  roomForm: RoomForm;
  setRoomForm: Dispatch<SetStateAction<RoomForm>>;
}

const CountPeople = ({ roomForm, setRoomForm }: CountPeopleProps) => {
  const handleDecrease = () => {
    if (roomForm.people > 0) {
      setRoomForm({ ...roomForm, people: roomForm.people - 1 });
    }
  };
  const handleIncrease = () => {
    setRoomForm({ ...roomForm, people: roomForm.people + 1 });
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
          onClick={handleDecrease}
        >
          <AiOutlineMinus />
        </button>
        <span className='w-2 text-sm font-normal'>{roomForm.people}</span>
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
