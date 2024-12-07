import LogoAndNotification from '@components/LogoAndNotification';

export interface TitleProps {
  title: string;
}

const HeaderWithTitle = ({ title }: TitleProps) => {
  return (
    <div className='fixed top-0 z-[1000] flex h-[132px] w-[375px] flex-col items-center bg-white'>
      <div className='fixed top-[46px] w-[330px] flex-col'>
        <div className='flex h-[37px] w-[100%] items-center justify-between'>
          <LogoAndNotification />
        </div>
        <p className='flex h-[42px] w-[100%] items-center justify-center text-[18px] font-normal'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default HeaderWithTitle;
