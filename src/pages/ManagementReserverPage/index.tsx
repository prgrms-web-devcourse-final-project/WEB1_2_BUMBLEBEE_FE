import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import ReserverList from './components/ReserverList';

const ManagementReserverPage = () => {
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='예약자 확인' />
      <ReserverList />
    </MainLayout>
  );
};

export default ManagementReserverPage;
