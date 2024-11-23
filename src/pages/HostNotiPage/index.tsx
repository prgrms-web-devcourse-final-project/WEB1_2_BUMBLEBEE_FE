import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';

const HostNotiPage = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='알림' />
      <hr className='fixed top-[93px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
    </MainLayout>
  );
};

export default HostNotiPage;