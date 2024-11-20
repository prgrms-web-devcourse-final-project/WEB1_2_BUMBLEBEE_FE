import { MdArrowForwardIos } from 'react-icons/md';
import LogoutButton from '@components/LogoutButton';
import LatestReservation from './LatestReservation';
import CategoryButton from './CategoryButton';

const UserButtonContainer = () => {
  return (
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
      <LogoutButton />
    </div>
  );
};

export default UserButtonContainer;
