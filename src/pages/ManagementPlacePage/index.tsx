import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import ManagementPlaceList from './components/ManagementPlaceList';

const ManagementPlacePage = () => {
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='사업장 관리' />
      <ManagementPlaceList />
    </MainLayout>
  );
};

export default ManagementPlacePage;
