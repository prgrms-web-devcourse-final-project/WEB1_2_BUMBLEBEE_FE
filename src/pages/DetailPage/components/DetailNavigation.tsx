import { postCreateChatRoom } from '@apis/chat';
import useAuthStore from '@store/authStore';
import { getRole } from '@utils/auth';
import { useEffect, useState } from 'react';
import { IoChatbubbleEllipsesOutline } from 'react-icons/io5';
import { useNavigate } from 'react-router-dom';

interface DetailNavigationProps {
  workplaceId: number;
  isBtnDisabled: boolean;
  selectedRoomId: number;
}

const DetailNavigation = ({
  workplaceId,
  isBtnDisabled,
  selectedRoomId,
}: DetailNavigationProps) => {
  const navigate = useNavigate();
  const handleClickChat = async () => {
    const roomId = await postCreateChatRoom(workplaceId);
    navigate(`/chat/${roomId}`);
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
        {isUser && (
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
          className={`h-[48px] rounded-[8px] text-white ${isBtnDisabled ? 'bg-subfont' : 'bg-primary'} ${isUser ? 'w-[222px]' : 'pointer-events-none w-custom bg-subfont'}`}
          disabled={isBtnDisabled}
          onClick={handleSelectRoom}
        >
          룸 선택하기
        </button>
      </div>
    </div>
  );
};

export default DetailNavigation;
