import UserMypage from '@pages/UserMypage';
import { createBrowserRouter } from 'react-router-dom';

const router = createBrowserRouter([
  {
    path: '/',
    // element: <MainPage />,
  },
  {
    path: '/login',
    // element: <LoginPage />,
  },
  {
    path: '/signup',
    // element: <SignUpPage />,
  },
  {
    path: '/user-page',
    element: <UserMypage />,
  },
  {
    path: '/reservation-page',
    // element:
  },
  {
    path: '/host-page',
    // element:
  },
  {
    path: '*',
    // element: <NotFoundPage />,
  },
]);

export default router;
