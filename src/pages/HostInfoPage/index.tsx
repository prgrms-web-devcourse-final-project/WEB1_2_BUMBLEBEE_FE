import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import HostInfoContainer from './components/HostInfoContainer';

const HostInfoPage = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='회원 정보' />
      <HostInfoContainer />
    </MainLayout>
  );
};

export default HostInfoPage;
