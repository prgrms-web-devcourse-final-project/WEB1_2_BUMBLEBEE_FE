import useAuthStore from '@store/authStore';
import useNotificationStore from '@store/notificationStore';
import { useCallback, useEffect } from 'react';
import { getRole } from '@utils/auth';
import NotiContainer from './NotiContainer';

const NotificationProvider = () => {
  const { isLogin } = useAuthStore();
  const { message, connect, state } = useNotificationStore();
  const role = getRole();

  const connectSSE = useCallback(() => {
    connect();
  }, [connect]);

  useEffect(() => {
    if (isLogin && role) {
      connectSSE();
    }
    if (!state) {
      connectSSE();
    }
  }, [isLogin, connectSSE, state, role]);

  return <>{isLogin && message && <NotiContainer message={message} />}</>;
};

export default NotificationProvider;
