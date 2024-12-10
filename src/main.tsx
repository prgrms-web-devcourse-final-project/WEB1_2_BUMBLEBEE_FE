import { createRoot } from 'react-dom/client';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RouterProvider } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Toastify from '@components/Toastify';
import NotificationProvider from '@components/NotificationProvider';
import router from './routes/Router';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <QueryClientProvider client={queryClient}>
    <NotificationProvider />
    <Toastify />
    <RouterProvider router={router} />
  </QueryClientProvider>,
);
