import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';

const ManagementReserverPage = () => {
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='예약자 확인' />
    </MainLayout>
  );
};

export default ManagementReserverPage;
