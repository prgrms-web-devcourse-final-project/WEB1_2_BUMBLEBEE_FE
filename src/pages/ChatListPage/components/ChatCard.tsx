import { ChatListBusiness, ChatListMember } from '@typings/types';
import { getDateFunction } from '@utils/formatTime';
import { GrNext } from 'react-icons/gr';
import { useNavigate } from 'react-router-dom';

interface ChatCardProps {
  chat: ChatListMember | ChatListBusiness;
}
const ChatCard = (props: ChatCardProps) => {
  const { chat } = props;
  const userName =
    'memberId' in chat ? chat.memberNickname : chat.workplaceName;
  const navigate = useNavigate();
  const handleClickChat = () => {
    navigate(`/chat/${chat.roomId}`, { state: userName });
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
            {userName} <GrNext className='text-xs' />
          </button>
          <span className='text-xs text-subfont'>
            {getDateFunction(chat.updatedAt)}
          </span>
        </div>
        <div className='flex items-center justify-between'>
          <div className='w-64 truncate text-start text-xs text-focusColor'>
            {chat.messageContent}
          </div>
          {!chat.isRead && (
            <span className='h-2 w-2 rounded-full bg-[#F83A3A]' />
          )}
        </div>
      </div>
    </button>
  );
};

export default ChatCard;
