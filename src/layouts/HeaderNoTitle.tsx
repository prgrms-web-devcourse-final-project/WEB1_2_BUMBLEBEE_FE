import LogoAndNotification from '@components/LogoAndNotification';
import useAuthStore from '@store/authStore';

const HeaderNoTitle = () => {
  const { isLogin } = useAuthStore();

  return (
    <div className='fixed top-0 z-[1000] flex h-[70px] w-[375px] flex-col items-center justify-center bg-white'>
      <div className='absolute flex h-[36px] w-[330px] items-center justify-between'>
        <LogoAndNotification isLogin={isLogin} />
      </div>
    </div>
  );
};

export default HeaderNoTitle;
