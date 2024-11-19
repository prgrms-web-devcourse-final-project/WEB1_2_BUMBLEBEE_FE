import { TitleProps } from './HeaderWithTitle';

const HeaderOnlyTitle = ({ title }: TitleProps) => {
  return (
    <div className='fixed top-0 z-[1000] flex h-[93px] w-[375px] flex-col items-center bg-white'>
      <p className='fixed top-[46px] flex h-[42px] flex-col items-center justify-center text-[18px] font-medium'>
        {title}
      </p>
    </div>
  );
};

export default HeaderOnlyTitle;
