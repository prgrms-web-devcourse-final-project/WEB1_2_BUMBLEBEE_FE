import { ReactNode } from 'react';

interface MainLayoutProps {
  children: ReactNode;
}

const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className='mx-auto my-0 w-[375px] max-w-[100%] bg-white'>
      {children}
    </div>
  );
};

export default MainLayout;
