import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import BusinessSignUpForm from './components/BusinessSignUpForm';

const BusinessSignUp = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='사업자 회원가입' />
      <BusinessSignUpForm />
    </MainLayout>
  );
};

export default BusinessSignUp;
