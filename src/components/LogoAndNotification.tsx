import Logo from '@assets/images/roomit_logo.png';
import { RiNotification3Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { getRole } from '@utils/auth';
// import useNotificationStore from '@store/notificationStore';

interface HeaderProps {
  isLogin: boolean;
}

const LogoAndNotification = ({ isLogin }: HeaderProps) => {
  const navigate = useNavigate();
  const role = getRole();

  const handleMoveToNotiPageClick = () => {
    if (role === 'ROLE_USER') {
      navigate('/user-noti');
    } else {
      navigate('/host-noti');
    }
  };

  return (
    <div className='flex w-custom items-center justify-between'>
      <Link to='/'>
        <img
          className='h-[15px] w-[50px]'
          src={Logo}
          alt='ROOM:IT 로고'
        />
      </Link>
      {isLogin && (
        <RiNotification3Line
          className='h-[24px] w-[24px] cursor-pointer'
          onClick={handleMoveToNotiPageClick}
        />
      )}
    </div>
  );
};

export default LogoAndNotification;
