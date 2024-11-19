import { createBrowserRouter } from 'react-router-dom';
import StartPage from '@pages/StartPage';
import UserLogin from '@pages/UserLogin';
import UserSignUp from '@pages/UserSignUp';
import BusinessLogin from '@pages/BusinessLogin';
import BusinessSignUp from '@pages/BusinessSignUp';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <MainPage />,
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
    path: '/user-page',
    // element: <MyPage />,
  },
  {
    path: '*',
    // element: <NotFoundPage />,
  },
]);

export default router;