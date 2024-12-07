import { AiFillNotification } from 'react-icons/ai';

const NotiContainer = ({ message }: { message: string }) => {
  return (
    <div className='notification fixed left-1/2 top-7 z-[2000] flex h-[70px] w-custom -translate-x-1/2 items-center justify-start gap-3 rounded-lg bg-white px-4 py-2 text-base text-black shadow-custom'>
      <AiFillNotification className='size-5 text-primary' />
      {message}
    </div>
  );
};

export default NotiContainer;
