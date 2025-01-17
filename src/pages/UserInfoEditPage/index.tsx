import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import UserEditContainer from './components/UserEditContainer';

const UserInfoEditPage = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='정보 수정' />
      <UserEditContainer />
    </MainLayout>
  );
};

export default UserInfoEditPage;
