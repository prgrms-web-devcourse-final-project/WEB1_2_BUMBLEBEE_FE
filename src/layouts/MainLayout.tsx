import { ReactNode, useEffect } from 'react';

interface MainLayoutProps {
  children: ReactNode;
  headerType?: 'both' | 'default';
}

const MainLayout = ({ children, headerType = 'default' }: MainLayoutProps) => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const paddingTop = headerType === 'both' ? 'pt-[106px]' : 'pt-[70px]';

  return (
    <div className='mx-auto my-0 h-[812px] w-[375px] max-w-[100%] bg-white'>
      <div className={paddingTop}>{children}</div>
    </div>
  );
};

export default MainLayout;
