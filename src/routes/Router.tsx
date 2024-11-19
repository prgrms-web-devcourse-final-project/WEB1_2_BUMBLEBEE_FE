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
    // element: <MyPage />,
  },
  {
    path: '*',
    // element: <NotFoundPage />,
  },
]);

export default router;
