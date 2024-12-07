import LogoAndNotification from '@components/LogoAndNotification';

const HeaderNoTitle = () => {
  return (
    <div className='fixed top-0 z-[1000] flex h-[93px] w-[375px] flex-col items-center bg-white'>
      <div className='fixed top-[46px] flex h-[37px] w-[330px] items-center justify-between'>
        <LogoAndNotification />
      </div>
    </div>
  );
};

export default HeaderNoTitle;
