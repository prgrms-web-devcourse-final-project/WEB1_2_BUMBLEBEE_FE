import LogoAndNotification from '@components/LogoAndNotification';
import { getAuthToken } from '@utils/auth';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { BASE_URL } from '@constants/constants';
import useAuthStore from '@store/authStore';

const HeaderNoTitle = () => {
  const { isLogin } = useAuthStore();
  const [message, setMessage] = useState<string>();
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
      const newMessage = JSON.parse(event.data);
      setMessage(newMessage);
    };

    // eslint 에러 제거 주석
    // eslint-disable-next-line consistent-return
    return () => {
      eventSource.close();
    };
  }, [isLogin]);

  return (
    <div className='fixed top-0 z-[1000] flex h-[93px] w-[375px] flex-col items-center bg-white'>
      <div className='fixed top-[46px] flex h-[37px] w-[330px] items-center justify-between'>
        <LogoAndNotification isLogin={isLogin} />
      </div>
    </div>
  );
};

export default HeaderNoTitle;
