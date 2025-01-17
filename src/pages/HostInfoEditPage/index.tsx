import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import HostEditContainer from './components/HostEditContainer';

const HostInfoEditPage = () => {
  return (
    <MainLayout>
      <HeaderOnlyTitle title='정보 수정' />
      <HostEditContainer />
    </MainLayout>
  );
};

export default HostInfoEditPage;
