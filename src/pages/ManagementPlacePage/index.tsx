import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import PlaceList from './components/PlaceList';

const ManagementPlacePage = () => {
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='사업장 관리' />
      <PlaceList />
    </MainLayout>
  );
};

export default ManagementPlacePage;
