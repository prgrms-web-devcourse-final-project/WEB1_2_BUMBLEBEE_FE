import { postCreateChatRoom } from '@apis/chat';
import useAuthStore from '@store/authStore';
import { getRole } from '@utils/auth';
import { useEffect, useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface DetailNavigationProps {
  workplaceId: number;
  workplaceName: string;
  isBtnDisabled: boolean;
  selectedRoomId: number;
}

const DetailNavigation = ({
  workplaceId,
  workplaceName,
  isBtnDisabled,
  selectedRoomId,
}: DetailNavigationProps) => {
  const navigate = useNavigate();
  const handleClickChat = async () => {
    const roomId = await postCreateChatRoom(workplaceId);
    navigate(`/chat/${roomId}`, { state: workplaceName });
  };

  const handleSelectRoom = async () => {
    navigate(`/reservation/${selectedRoomId}`);
  };

  // 사용자 / 사업자인지 확인
  const { isLogin } = useAuthStore();
  const [isUser, setIsUser] = useState<boolean>(false);

  useEffect(() => {
    if (isLogin) {
      const role = getRole();
      if (role === 'ROLE_USER') {
        setIsUser(true);
      }
    }
  }, [isLogin]);

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-center border-t border-subfont bg-white pb-[16px]'>
      <div className='flex items-center gap-2'>
        {isLogin && !isUser ? (
          <div />
        ) : (
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
        )}
        <button
          type='button'
          className={`h-[48px] rounded-[8px] text-white ${isBtnDisabled ? 'bg-subfont' : 'bg-primary'} ${isLogin && !isUser ? 'pointer-events-none w-custom bg-subfont' : 'w-[222px]'}`}
          disabled={isBtnDisabled}
          onClick={handleSelectRoom}
        >
          {isLogin && !isUser
            ? '사업자는 룸을 선택할 수 없습니다.'
            : '룸 선택하기'}
        </button>
      </div>
    </div>
  );
};

export default DetailNavigation;
