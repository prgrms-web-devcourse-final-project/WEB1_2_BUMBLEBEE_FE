import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import UserNotiList from './components/UserNotiList';

const UserNotiPage = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='알림' />
      <hr className='fixed top-[70px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      <UserNotiList />
    </MainLayout>
  );
};

export default UserNotiPage;
