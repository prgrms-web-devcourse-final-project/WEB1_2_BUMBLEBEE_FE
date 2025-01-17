import { TitleProps } from './HeaderWithTitle';

const HeaderOnlyTitle = ({ title }: TitleProps) => {
  return (
    <div className='fixed top-0 z-[1000] flex h-[70px] w-[375px] flex-col items-center justify-center bg-white'>
      <p className='flex h-[42px] w-[375px] flex-col items-center justify-center text-[18px] font-normal'>
        {title}
      </p>
    </div>
  );
};

export default HeaderOnlyTitle;
