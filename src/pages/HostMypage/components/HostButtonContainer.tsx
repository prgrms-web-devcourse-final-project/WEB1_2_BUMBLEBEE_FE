import CategoryButton from '@pages/UserMypage/components/CategoryButton';
import HostCategoryButton from './HostCategoryButton';

const HostButtonContainer = () => {
  return (
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
  );
};

export default HostButtonContainer;
