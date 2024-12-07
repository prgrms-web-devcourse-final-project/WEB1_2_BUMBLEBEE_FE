import { AiFillNotification } from 'react-icons/ai';
import { Link } from 'react-router-dom';

const NotiContainer = ({
  message,
  workplaceId,
}: {
  message: string;
  workplaceId: number;
}) => {
  return (
    <Link to={`/detail/${workplaceId}`}>
      <div className='fixed left-[50%] top-8 z-[2000] flex h-[70px] w-custom translate-x-[-50%] items-center justify-start gap-3 rounded-lg bg-white px-4 py-2 text-base text-black shadow-custom'>
        <AiFillNotification className='size-5 text-primary' />
        {message}
      </div>
    </Link>
  );
};

export default NotiContainer;
