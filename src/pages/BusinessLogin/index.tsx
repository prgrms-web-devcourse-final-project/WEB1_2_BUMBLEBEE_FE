import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import BusinessLoginForm from './components/BusinessLoginForm';

const BusinessLogin = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='사업자 로그인' />
      <BusinessLoginForm />
    </MainLayout>
  );
};

export default BusinessLogin;
