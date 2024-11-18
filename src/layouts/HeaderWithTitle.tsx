import Logo from '@assets/images/roomit_logo.png';
import { AiOutlineBell } from 'react-icons/ai';

export interface TitleProps {
  title: string;
}

const HeaderWithTitle = ({ title }: TitleProps) => {
  return (
    <div className='fixed top-0 flex h-[132px] w-[375px] flex-col items-center bg-white'>
      <div className='fixed top-[46px] w-[330px] flex-col'>
        <div className='flex h-[37px] w-[100%] items-center justify-between'>
          <img
            className='h-[15px] w-[50px]'
            src={Logo}
            alt='ROOM:IT 로고'
          />
          <AiOutlineBell className='h-[24px] w-[24px]' />
        </div>
        <p className='flex h-[42px] w-[100%] items-center justify-center text-[18px] font-medium'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default HeaderWithTitle;
