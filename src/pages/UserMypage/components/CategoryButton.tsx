import { MdArrowForwardIos } from 'react-icons/md';

export interface CategoryProps {
  category: string;
}

const CategoryButton = ({ category }: CategoryProps) => {
  return (
    <button
      type='button'
      className='flex h-[49px] items-center justify-between rounded-[10px] bg-white px-[16px] py-[9px] text-[14px] font-normal shadow-[0_0_6px_0_rgba(0,0,0,0.25)]'
    >
      {category}
      <MdArrowForwardIos />
    </button>
  );
};

export default CategoryButton;
