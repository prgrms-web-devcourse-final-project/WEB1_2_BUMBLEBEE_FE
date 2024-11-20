import CategoryButton from '@pages/UserMypage/components/CategoryButton';
import LogoutButton from '@components/LogoutButton';
import HostCategoryButton from './HostCategoryButton';

const HostButtonContainer = () => {
  return (
    <div className='absolute top-[290px] flex w-[330px] flex-col gap-[18px]'>
      <HostCategoryButton category='예약자 확인' />
      <HostCategoryButton category='사업장 관리' />
      <CategoryButton category='회원 정보' />
      <LogoutButton />
    </div>
  );
};

export default HostButtonContainer;
