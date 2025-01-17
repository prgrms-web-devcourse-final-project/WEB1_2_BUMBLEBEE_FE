import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import UserSignUpForm from './components/UserSignUpForm';

const UserSignUp = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='사용자 회원가입' />
      <UserSignUpForm />
    </MainLayout>
  );
};

export default UserSignUp;
