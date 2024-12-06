import LogoAndNotification from '@components/LogoAndNotification';
import { BASE_URL } from '@constants/constants';
import useAuthStore from '@store/authStore';
import { SseAlarm } from '@typings/types';
import { getAuthToken } from '@utils/auth';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export interface TitleProps {
  title: string;
}

const HeaderWithTitle = ({ title }: TitleProps) => {
  const { isLogin } = useAuthStore();
  const [message, setMessage] = useState<string>('');
  console.log(message);

  useEffect(() => {
    if (!isLogin) return;

    setMessage('');
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const token = getAuthToken() || '';
    const eventSource = new EventSource(`${BASE_URL}/api/subscribe`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      const newMessage: SseAlarm = JSON.parse(event.data);
      setMessage(newMessage.content);

      if (newMessage.content !== 'connected!') {
        toast.info(newMessage.content);
      }
    };

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
    };

    // eslint 에러 제거 주석
    // eslint-disable-next-line consistent-return
    return () => {
      eventSource.close();
    };
  }, [isLogin]);

  return (
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
  );
};

export default HeaderWithTitle;
