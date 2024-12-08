import useAuthStore from '@store/authStore';
import useNotificationStore from '@store/notificationStore';
import { useCallback, useEffect } from 'react';
import NotiContainer from './NotiContainer';

const NotificationProvider = () => {
  const { isLogin } = useAuthStore();
  const { message, connect, state } = useNotificationStore();

  const connectSSE = useCallback(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (!isLogin) return;
    connectSSE();

    if (!state) {
      connectSSE();
    }
  }, [isLogin, connectSSE, state]);

  return <>{isLogin && message && <NotiContainer message={message} />}</>;
};

export default NotificationProvider;
