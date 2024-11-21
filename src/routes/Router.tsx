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
import RegisterSpace from '@pages/RegisterSpace';

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
    path: '/host-page',
    element: <HostMypage />,
  },
  {
    path: '/management-place-list',
    element: <ManagementPlacePage />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '*',
    // element: <NotFoundPage />,
  },
]);

export default router;
