import { postCreateChatRoom } from '@apis/chat';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface DetailNavigationProps {
  workplaceId: number;
  isBtnDisabled: boolean;
}

const DetailNavigation = ({
  workplaceId,
  isBtnDisabled,
}: DetailNavigationProps) => {
  const navigate = useNavigate();
  const handleClickChat = async () => {
    const roomId = await postCreateChatRoom(workplaceId);
    console.log(roomId);
    navigate(`/chat/${roomId}`);
  };

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-center border-t border-subfont bg-white pb-[16px]'>
      <div className='flex'>
        <button
          type='button'
          className='flex h-[48px] w-[100px] items-center justify-center rounded-[8px] border border-primary'
          onClick={handleClickChat}
        >
          <IoChatbubbleEllipsesOutline
            size='20px'
            color='#50BEAD'
          />
          <p className='ml-[4px] text-[16px] font-medium text-primary'>
            1 : 1 문의
          </p>
        </button>
        <button
          type='button'
          className='ml-[8px] w-[222px] rounded-[8px] text-white'
          disabled={isBtnDisabled}
          style={{
            backgroundColor: isBtnDisabled === false ? '#50BEAD' : '#c3c3c3',
          }}
        >
          룸 선택하기
        </button>
      </div>
    </div>
  );
};

export default DetailNavigation;
