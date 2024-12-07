import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { BASE_URL } from '@constants/constants';
import { getAuthToken, getRole } from '@utils/auth';
import LogoAndNotification from '@components/LogoAndNotification';
import useAuthStore from '@store/authStore';
import { useEffect, useState } from 'react';
import { SseAlarm } from '@typings/types';
import NotiContainer from '@components/NotiContainer';

export interface TitleProps {
  title: string;
}
interface AlarmContent {
  type: string;
  workplaceId: number;
}

const HeaderWithTitle = ({ title }: TitleProps) => {
  const { isLogin } = useAuthStore();
  const role = getRole();
  const [message, setMessage] = useState<AlarmContent>();

  useEffect(() => {
    const connect = () => {
      if (!isLogin || role === 'ROLE_USER') return;

      setMessage({
        type: '',
        workplaceId: 0,
      });
      const EventSource = EventSourcePolyfill || NativeEventSource;
      const token = getAuthToken() || '';
      const eventSource = new EventSource(`${BASE_URL}/api/subscribe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        heartbeatTimeout: 1860000,
      });

      eventSource.onopen = () => {
        console.log('open');
      };

      eventSource.onmessage = (event) => {
        const newMessage: SseAlarm = JSON.parse(event.data);
        console.log(newMessage);

        if (newMessage.content !== 'connected!') {
          if (newMessage.notificationType === 'REVIEW_CREATED') {
            setMessage({
              type: '새 리뷰 등록',
              workplaceId: newMessage.workplaceId,
            });
          }
        }
      };

      eventSource.onerror = async (error) => {
        console.error('SSE Error:', error);
        eventSource.close();

        setTimeout(connect, 1000);
      };

      // eslint 에러 제거 주석
      // eslint-disable-next-line consistent-return
      return () => {
        try {
          // 페이지 연결 시 구독 끊기
          eventSource.close();
          console.log('구독 끊기');
        } catch (error) {
          console.warn('EventSource 종료 중 에러:', error);
        }
      };
    };

    return connect();
  }, [isLogin, role]);

  return (
    <>
      <div className='fixed top-0 z-[1000] flex h-[132px] w-[375px] flex-col items-center bg-white'>
        <div className='fixed top-[46px] w-[330px] flex-col'>
          <div className='flex h-[37px] w-[100%] items-center justify-between'>
            <LogoAndNotification isLogin={isLogin} />
          </div>
          <p className='flex h-[42px] w-[100%] items-center justify-center text-[18px] font-normal'>
            {title}
          </p>
        </div>
      </div>
      {isLogin && message && message.type !== 'connected!' && (
        <NotiContainer
          message={message.type}
          workplaceId={message.workplaceId}
        />
      )}
    </>
  );
};

export default HeaderWithTitle;
