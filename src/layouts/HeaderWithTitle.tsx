import LogoAndNotification from '@components/LogoAndNotification';
import useAuthStore from '@store/authStore';

export interface TitleProps {
  title: string;
}

const HeaderWithTitle = ({ title }: TitleProps) => {
  const { isLogin } = useAuthStore();

  return (
    <div className='fixed top-0 z-[1000] flex h-[112px] w-[375px] flex-col items-center justify-center bg-white py-[17px]'>
      <div className='w-[330px] flex-col'>
        <div className='flex h-[36px] w-[100%] items-center justify-between'>
          <LogoAndNotification isLogin={isLogin} />
        </div>
        <p className='flex h-[42px] w-[100%] items-center justify-center text-[18px] font-normal'>
          {title}
        </p>
      </div>
    </div>
  );
};

export default HeaderWithTitle;
