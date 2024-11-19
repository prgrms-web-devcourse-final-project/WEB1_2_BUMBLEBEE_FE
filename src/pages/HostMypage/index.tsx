import BottomNavigation from '@layouts/BottomNavigation';
import HeaderNoTitle from '@layouts/HeaderNoTitle';
import MainLayout from '@layouts/MainLayout';
import HostButtonContainer from './components/HostButtonContainer';
import HostInfo from './components/HostInfo';

const HostMypage = () => {
  return (
    <MainLayout>
      <HeaderNoTitle />
      <div className='flex h-[263px] w-[375px] flex-col items-center bg-primary'>
        <HostInfo />
        <HostButtonContainer />
      </div>
      <BottomNavigation />
    </MainLayout>
  );
};

export default HostMypage;
