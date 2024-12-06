import { ChatListResponse } from '@typings/types';
import { getDateFunction } from '@utils/formatTime';
import { GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

interface ChatCardProps {
  chat: ChatListResponse;
}
const ChatCard = (props: ChatCardProps) => {
  const { chat } = props;

  const navigate = useNavigate();
  const handleClickChat = () => {
    navigate(`/chat/${chat.roomId}`, { state: chat.name });
  };

  return (
    <button
      type='button'
      onClick={handleClickChat}
      className='flex h-[108px] w-custom items-center rounded-lg bg-white px-4 py-5 shadow-custom'
    >
      <div className='flex w-full flex-col gap-[10px]'>
        <div className='flex items-center justify-between'>
          <button
            type='button'
            className='flex items-center gap-1 text-sm font-medium'
          >
            {chat.name} <GrNext className='text-xs' />
          </button>
          <span className='text-xs text-subfont'>
            {getDateFunction(chat.updatedAt)}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='w-64 text-xs text-focusColor'>
            안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요. 안녕하세요.
            안녕하세요. 안녕하세요. 안녕하세요. 안.....
          </div>
          <span className='h-2 w-2 rounded-full bg-[#F83A3A]' />
        </div>
      </div>
    </button>
  );
};

export default ChatCard;
