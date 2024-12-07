import { useNavigate } from 'react-router-dom';
import { MdArrowForwardIos } from 'react-icons/md';
import useGetUserData from '@pages/UserMypage/hooks/useGetUserData';
import UserInfoBox from './UserInfoBox';

const UserInfoContainer = () => {
  const navigate = useNavigate();
  const { user } = useGetUserData();

  const handleMoveEditPage = () => {
    navigate('/user-info-edit', {
      state: user,
    });
  };

  return (
    <div className='mt-10 flex w-[375px] flex-col justify-center'>
      <div className='mx-auto flex w-custom flex-col justify-center gap-10'>
        <UserInfoBox user={user} />
        <button
          type='button'
          className='flex h-[30px] items-center gap-1 self-end text-subfont active:text-primary'
          onClick={handleMoveEditPage}
        >
          수정하기
          <MdArrowForwardIos />
        </button>
      </div>
    </div>
  );
};

export default UserInfoContainer;
