import MainLayout from '@layouts/MainLayout';
import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import { useLocation } from 'react-router-dom';
import ReservationInfo from './components/ReservationInfo';
import WriteReview from './components/WriteReview';

export interface WriteReviewProps {
  reservationId: number;
  workPlaceName: string;
  reservationCreatedAt: string;
  reservationTime: string;
  reservationCapacity: number;
  price: string;
  reservationDay: string;
  studyRoomName: string;
}

const WriteReviewPage = () => {
  const location = useLocation();
  const reservationInfo: WriteReviewProps = { ...location.state };
  const { reservationId, workPlaceName } = reservationInfo;

  return (
    <MainLayout>
      <HeaderOnlyTitle title='리뷰 작성' />
      <hr className='fixed top-[70px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      <ReservationInfo item={reservationInfo} />
      <hr className='mx-[22.5px] w-custom border-[0.5px] border-dashed' />
      <WriteReview
        reservationIdInfo={reservationId}
        workPlaceNameInfo={workPlaceName}
      />
    </MainLayout>
  );
};

export default WriteReviewPage;
