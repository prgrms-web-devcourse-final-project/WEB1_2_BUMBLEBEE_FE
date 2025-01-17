import { create } from 'zustand';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { getAuthToken, getRole } from '@utils/auth';
import { BASE_URL } from '@constants/constants';
import { BusinessNotification } from '@typings/types';

interface NotificationState {
  message: string | null;
  connect: () => void;
  disconnect: () => void;
  state: boolean;
}

const EventSource = EventSourcePolyfill || NativeEventSource;
const role = getRole();
const ssePath =
  role === 'ROLE_USER'
    ? `${BASE_URL}/api/subscribe/user`
    : `${BASE_URL}/api/subscribe`;
const useNotificationStore = create<NotificationState>((set) => ({
  message: null,
  state: true,
  link: '/',
  activeNoti: false,

  connect: () => {
    const token = getAuthToken() || '';

    const eventSource = new EventSource(ssePath, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
      heartbeatTimeout: 1860000,
    });

    eventSource.onopen = () => {
      set(() => ({ state: true }));
    };

    eventSource.onmessage = (event) => {
      const newMessage: BusinessNotification = JSON.parse(event.data);

      if (
        newMessage.content === 'connected!' ||
        newMessage.notificationType === undefined
      ) {
        return;
      }

      // 사용자 역할에 따른 알림 처리
      const isUserNotification =
        role === 'ROLE_USER' && newMessage.notificationType;
      const isBusinessNotification =
        role === 'ROLE_BUSINESS' && newMessage.notificationType;

      if (isUserNotification || isBusinessNotification) {
        const newText =
          newMessage.notificationType === 'REVIEW_CREATED'
            ? '새 리뷰가 등록되었습니다.'
            : '새로운 예약이 등록되었습니다.';

        set((state) => {
          if (state.message === newText) {
            return state;
          }
          return { message: newText };
        });

        setTimeout(() => {
          set(() => ({ message: null }));
        }, 2000);
      }
    };

    // sse 에러 발생하면 연결 종료
    eventSource.onerror = () => {
      eventSource.close();
      set(() => ({ message: null }));
      set(() => ({ state: false }));
    };

    set(() => ({
      disconnect: () => {
        eventSource.close();
      },
    }));
  },

  disconnect: () => {
    console.warn('연결 해제 시도');
  },
}));

export default useNotificationStore;
