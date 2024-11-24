import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import InfoForm from './components/InfoForm';

const UserInfoPage = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='회원 정보' />
      <InfoForm />
    </MainLayout>
  );
};

export default UserInfoPage;
