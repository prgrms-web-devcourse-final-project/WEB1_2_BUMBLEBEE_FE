import Logo from '@assets/images/roomit_logo.png';
import { BASE_URL } from '@constants/constants';
import useAuthStore from '@store/authStore';
import { getAuthToken, getRole } from '@utils/auth';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { useEffect, useState } from 'react';
import { RiNotification3Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { SseAlarm } from '@typings/types';
import NotiContainer from './notiContainer';

const LogoAndNotification = () => {
  const navigate = useNavigate();
  const { isLogin } = useAuthStore();
  const role = getRole();

  const [message, setMessage] = useState<SseAlarm>();

  const handleMoveToNotiPageClick = () => {
    if (role === 'ROLE_USER') {
      navigate('/user-noti');
    } else {
      navigate('/host-noti');
    }
  };

  useEffect(() => {
    console.log('useEffect');
    const EventSource = EventSourcePolyfill || NativeEventSource;
    const token = getAuthToken() || '';
    console.log(token);
    const eventSource = new EventSource(`${BASE_URL}/api/subscribe`, {
      headers: {
        Authorization: token,
      },
      withCredentials: true,
    });

    console.log('EventSource initialized:', eventSource);

    eventSource.onmessage = (event) => {
      const newMessage = event.data;
      setMessage(newMessage);
    };

    eventSource.onerror = (error) => {
      console.log(error);
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <>
      <Link to='/'>
        <img
          className='h-[15px] w-[50px]'
          src={Logo}
          alt='ROOM:IT 로고'
        />
      </Link>
      {isLogin && (
        <RiNotification3Line
          className='h-[24px] w-[24px] cursor-pointer'
          onClick={handleMoveToNotiPageClick}
        />
      )}
      {isLogin && message && <NotiContainer message={message} />}
    </>
  );
};

export default LogoAndNotification;
