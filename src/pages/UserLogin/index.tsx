import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import UserLoginForm from './components/UserLoginForm';

const UserLogin = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='사용자 로그인' />
      <UserLoginForm />
    </MainLayout>
  );
};

export default UserLogin;
