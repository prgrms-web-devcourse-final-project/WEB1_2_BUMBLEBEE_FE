import Logo from '@assets/images/roomit_logo.png';
import { RiNotification3Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';

const HeaderNoTitle = () => {
  return (
    <div className='fixed top-0 z-[1000] flex h-[93px] w-[375px] flex-col items-center bg-white'>
      <div className='fixed top-[46px] flex h-[37px] w-[330px] items-center justify-between'>
        <Link to='/'>
          <img
            className='h-[15px] w-[50px]'
            src={Logo}
            alt='ROOM:IT 로고'
          />
        </Link>
        <RiNotification3Line className='h-[24px] w-[24px]' />
      </div>
    </div>
  );
};

export default HeaderNoTitle;
