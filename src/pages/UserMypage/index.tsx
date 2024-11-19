import HeaderNoTitle from '@layouts/HeaderNoTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import { MdArrowForwardIos } from 'react-icons/md';
import LatestReservation from './components/LatestReservation';
import CategoryButton from './components/CategoryButton';

const user = {
  name: 'HYUN',
  email: 'hyun@gmail.com',
};

const UserMypage = () => {
  return (
    <>
      <MainLayout>
        <HeaderNoTitle />

        <div className='flex h-[263px] w-[375px] flex-col items-center bg-primary'>
          <div className='self-start pl-[33px] pt-[30px]'>
            <div className='text-[32px] font-bold leading-none text-white'>
              {user.name}
            </div>
            <div className='pt-0 text-[14px] text-white'>{user.email}</div>
          </div>
          <div className='absolute top-[255px] flex w-[330px] flex-col gap-[18px]'>
            <div className='flex flex-col gap-[10px]'>
              <button
                type='button'
                className='flex items-center gap-[2px] self-end text-[14px] text-white'
              >
                예약 내역
                <MdArrowForwardIos />
              </button>
              <LatestReservation />
            </div>
            <CategoryButton category='리뷰 관리' />
            <CategoryButton category='회원 정보' />
            <button
              type='button'
              className='h-[25px] self-start text-[12px] text-subfont underline'
            >
              로그아웃
            </button>
          </div>
        </div>

        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default UserMypage;
