import { CategoryProps } from '@pages/UserMypage/components/CategoryButton';
import { RiGroupLine, RiCommunityLine } from 'react-icons/ri';

const HostCategoryButton = ({ category }: CategoryProps) => {
  return (
    <button
      type='button'
      className='flex h-[136px] w-[330px] flex-col justify-end gap-[10px] rounded-[10px] bg-white px-[16px] py-[20px] text-[18px] font-normal shadow-[0_0_6px_0_rgba(0,0,0,0.25)]'
    >
      {category === '예약자 확인' ? (
        <RiGroupLine className='h-[30px] w-[30px] text-primary' />
      ) : (
        <RiCommunityLine className='h-[30px] w-[30px] text-primary' />
      )}
      {category}
    </button>
  );
};

export default HostCategoryButton;
