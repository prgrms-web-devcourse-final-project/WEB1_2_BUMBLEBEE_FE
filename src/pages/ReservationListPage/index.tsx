import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import ReservationList from './components/ReservationList';

const ReservationListPage = () => {
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='예약 내역' />
      <ReservationList />
    </MainLayout>
  );
};

export default ReservationListPage;
