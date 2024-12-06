import Logo from '@assets/images/roomit_logo.png';
import { getRole } from '@utils/auth';
import { RiNotification3Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';

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
    <>
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
    </>
  );
};

export default LogoAndNotification;
