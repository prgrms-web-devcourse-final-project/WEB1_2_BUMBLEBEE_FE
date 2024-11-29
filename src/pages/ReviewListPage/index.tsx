import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import MyReviewList from './components/MyReviewList';

const ReviewListPage = () => {
  return (
    <MainLayout headerType='both'>
      <HeaderWithTitle title='리뷰' />
      <MyReviewList />
    </MainLayout>
  );
};

export default ReviewListPage;
