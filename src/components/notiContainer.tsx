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
      <div className='notification absolute -top-4 right-[calc(50%-12px)] z-[2000] flex h-[70px] w-custom items-center justify-start gap-3 rounded-lg bg-white px-4 py-2 text-base text-black shadow-custom'>
        <AiFillNotification className='size-5 text-primary' />
        {message}
      </div>
    </Link>
  );
};

export default NotiContainer;
