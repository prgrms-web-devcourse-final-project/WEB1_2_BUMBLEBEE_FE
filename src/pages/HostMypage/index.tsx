import BottomNavigation from '@layouts/BottomNavigation';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import MainLayout from '@layouts/MainLayout';
import CategoryButton from '../UserMypage/components/CategoryButton';
import HostCategoryButton from './components/HostCategoryButton';

const host = {
  name: 'HOST',
  email: 'host@gmail.com',
};

const HostMypage = () => {
  return (
    <MainLayout>
      <HeaderNoTitle />
      <div className='flex h-[263px] w-[375px] flex-col items-center bg-primary'>
        <div className='self-start pl-[33px] pt-[30px]'>
          <div className='text-[32px] font-bold leading-none text-white'>
            {host.name}
          </div>
          <div className='pt-0 text-[14px] text-white'>{host.email}</div>
        </div>
        <div className='absolute top-[290px] flex w-[330px] flex-col gap-[18px]'>
          <HostCategoryButton category='예약자 확인' />
          <HostCategoryButton category='사업장 관리' />
          <CategoryButton category='회원 정보' />
          <button
            type='button'
            className='h-[23px] self-start text-[12px] text-subfont underline active:text-black'
          >
            로그아웃
          </button>
        </div>
      </div>
      <BottomNavigation />
    </MainLayout>
  );
};

export default HostMypage;
