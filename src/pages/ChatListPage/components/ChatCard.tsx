import { GrNext } from 'react-icons/gr';

const ChatCard = () => {
  return (
    <div className='flex h-[108px] w-custom items-center rounded-lg bg-white px-4 py-5 shadow-custom'>
      <div className='flex w-full flex-col gap-[10px]'>
        <div className='flex items-center justify-between'>
          <button
            type='button'
            className='flex items-center text-sm font-medium'
          >
            ABC 스터디룸 <GrNext className='text-xs' />
          </button>
          <span className='text-xs text-subfont'>2024.11.12</span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='w-64 text-xs text-focusColor'>
            안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요.
            안녕하세요. 안녕하세요. 안녕하세요. 안.....
          </div>
          <span className='h-2 w-2 rounded-full bg-[#F83A3A]' />
        </div>
      </div>
    </div>
  );
};

export default ChatCard;
