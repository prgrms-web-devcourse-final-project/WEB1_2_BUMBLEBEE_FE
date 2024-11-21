import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';

const ManagementPlacePage = () => {
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='사업장 관리' />
    </MainLayout>
  );
};

export default ManagementPlacePage;
