import LogoAndNotification from '@components/LogoAndNotification';
import NotiContainer from '@components/notiContainer';
import { BASE_URL } from '@constants/constants';
import useAuthStore from '@store/authStore';
import { SseAlarm } from '@typings/types';
import { getAuthToken, getRole } from '@utils/auth';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useState } from 'react';

export interface TitleProps {
  title: string;
}

const HeaderWithTitle = ({ title }: TitleProps) => {
  const { isLogin } = useAuthStore();
  const role = getRole();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    console.log('useEffect');
    const connect = () => {
      if (!isLogin || role === 'ROLE_USER') return;

      setMessage('');
      const EventSource = EventSourcePolyfill || NativeEventSource;
      const token = getAuthToken() || '';
      const eventSource = new EventSource(`${BASE_URL}/api/subscribe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        // // eventpolyfill timeout이 45초로 설정되어 있어서 서버 30분에 맞춰 31분으로 지정
        heartbeatTimeout: 1860000,
      });

      eventSource.onopen = () => {
        console.log('open');
      };

      eventSource.onmessage = (event) => {
        const newMessage: SseAlarm = JSON.parse(event.data);
        console.log(newMessage);

        if (newMessage.content !== 'connected!') {
          setMessage(newMessage.content);
          console.log(newMessage);
        }
      };

      eventSource.onerror = async () => {
        eventSource.close();

        setTimeout(connect, 1000);
      };

      // eslint 에러 제거 주석
      // eslint-disable-next-line consistent-return
      return () => {
        try {
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
      {isLogin && message && message !== 'connected!' && (
        <NotiContainer message={message} />
      )}
    </>
  );
};

export default HeaderWithTitle;
