import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useLocation } from 'react-router-dom';
import EditReview from './components/EditReview';

export interface ReviewInfoProps {
  workplaceName: string;
  reviewId: number;
  reviewContent: string;
  reviewRating: number;
  studyRoomName: string;
  workplaceImageURL: string;
}

const EditReviewPage = () => {
  const location = useLocation();
  const reviewInfo: ReviewInfoProps = { ...location.state };

  return (
    <MainLayout>
      <HeaderOnlyTitle title='리뷰 수정' />
      <hr className='fixed top-[70px] mx-[22.5px] h-0.5 w-custom border-0 bg-black' />
      <EditReview data={reviewInfo} />
    </MainLayout>
  );
};

export default EditReviewPage;
