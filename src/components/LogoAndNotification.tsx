import Logo from '@assets/images/roomit_logo.png';
import { RiNotification3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const LogoAndNotification = () => {
  return (
    <>
      <Link to='/'>
        <img
          className='h-[15px] w-[50px]'
          src={Logo}
          alt='ROOM:IT 로고'
        />
      </Link>
      <RiNotification3Line className='h-[24px] w-[24px]' />
    </>
  );
};

export default LogoAndNotification;
