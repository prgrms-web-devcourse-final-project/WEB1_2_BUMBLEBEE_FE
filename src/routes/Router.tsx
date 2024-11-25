import MainPage from '@pages/MainPage';
import HostMypage from '@pages/HostMypage';
import UserMypage from '@pages/UserMypage';
import { createBrowserRouter } from 'react-router-dom';
import StartPage from '@pages/StartPage';
import UserLogin from '@pages/UserLogin';
import UserSignUp from '@pages/UserSignUp';
import BusinessLogin from '@pages/BusinessLogin';
import BusinessSignUp from '@pages/BusinessSignUp';
import Search from '@pages/SearchPage';
import WriteReviewPage from '@pages/WriteReviewPage';
import ReservationListPage from '@pages/ReservationListPage';
import ReviewListPage from '@pages/ReviewListPage';
import ManagementPlacePage from '@pages/ManagementPlacePage';
import ManagementReserverPage from '@pages/ManagementReserverPage';
import RegisterSpace from '@pages/RegisterSpace';
import UserNotiPage from '@pages/UserNotiPage';
import SearchResult from '@pages/SearchResult';
import ReservationPage from '@pages/ReservationPage';
import HostNotiPage from '@pages/HostNotiPage';
import UserInfoPage from '@pages/UserInfoPage';
import PaymentPage from '@pages/PaymentPage';
import PaymentSuccessPage from '@pages/PaymentSuccessPage';
import HostInfoPage from '@pages/HostInfoPage';
import DetailPage from '@pages/DetailPage';

const router = createBrowserRouter([
  {
    path: '/',
    element: <MainPage />,
  },
  {
    path: '/start',
    element: <StartPage />,
  },
  {
    path: '/login/user',
    element: <UserLogin />,
  },
  {
    path: '/login/business',
    element: <BusinessLogin />,
  },
  {
    path: '/signup/user',
    element: <UserSignUp />,
  },
  {
    path: '/signup/business',
    element: <BusinessSignUp />,
  },
  {
    path: '/register-Space',
    element: <RegisterSpace />,
  },
  {
    path: '/detail',
    element: <DetailPage />,
  },
  {
    path: '/user-page',
    element: <UserMypage />,
  },
  {
    path: '/reservation-list',
    element: <ReservationListPage />,
  },
  {
    path: '/write-review',
    element: <WriteReviewPage />,
  },
  {
    path: '/review-list',
    element: <ReviewListPage />,
  },
  {
    path: '/user-noti',
    element: <UserNotiPage />,
  },
  {
    path: '/user-info',
    element: <UserInfoPage />,
  },
  {
    path: '/host-page',
    element: <HostMypage />,
  },
  {
    path: '/management-place-list',
    element: <ManagementPlacePage />,
  },
  {
    path: '/management-reserver-list',
    element: <ManagementReserverPage />,
  },
  {
    path: '/host-noti',
    element: <HostNotiPage />,
  },
  {
    path: 'host-info',
    element: <HostInfoPage />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/search-result',
    element: <SearchResult />,
  },
  {
    path: '/reservation',
    element: <ReservationPage />,
  },
  {
    path: '/payment',
    element: <PaymentPage />,
  },
  {
    path: '/payment-success',
    element: <PaymentSuccessPage />,
  },
  {
    path: '*',
    // element: <NotFoundPage />,
  },
]);

export default router;
