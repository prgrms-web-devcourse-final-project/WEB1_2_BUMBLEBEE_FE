import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import UserInfoContainer from './components/UserInfoContainer';

const UserInfoPage = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='회원 정보' />
      <UserInfoContainer />
    </MainLayout>
  );
};

export default UserInfoPage;
