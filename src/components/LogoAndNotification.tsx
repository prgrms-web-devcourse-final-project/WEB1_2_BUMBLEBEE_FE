import Logo from '@assets/images/roomit_logo.png';
import { RiNotification3Line } from 'react-icons/ri';
import { Link, useNavigate } from 'react-router-dom';
import { SseAlarm } from '@typings/types';
import { getAuthToken, getRole } from '@utils/auth';
import { useEffect, useState } from 'react';
import { EventSourcePolyfill, NativeEventSource } from 'event-source-polyfill';
import { BASE_URL } from '@constants/constants';
import NotiContainer from './NotiContainer';

interface HeaderProps {
  isLogin: boolean;
}
interface AlarmContent {
  type: string | null;
  workplaceId: number | null;
}

const LogoAndNotification = ({ isLogin }: HeaderProps) => {
  const navigate = useNavigate();
  const role = getRole();

  const handleMoveToNotiPageClick = () => {
    if (role === 'ROLE_USER') {
      navigate('/user-noti');
    } else {
      navigate('/host-noti');
    }
  };

  const [message, setMessage] = useState<AlarmContent>({
    type: null,
    workplaceId: null,
  });

  useEffect(() => {
    const connect = () => {
      if (!isLogin || role === 'ROLE_USER') return;

      const EventSource = EventSourcePolyfill || NativeEventSource;
      const token = getAuthToken() || '';
      const eventSource = new EventSource(`${BASE_URL}/api/subscribe`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        withCredentials: true,
        heartbeatTimeout: 1860000,
      });

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

          if (newMessage.notificationType === 'RESERVATION_CONFIRMED') {
            setMessage({
              type: '새로운 예약',
              workplaceId: newMessage.workplaceId,
            });
          }

          setTimeout(() => {
            setMessage({
              type: null,
              workplaceId: null,
            });
          }, 2000);
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
    <div className='flex w-custom items-center justify-between'>
      <Link to='/'>
        <img
          className='h-[15px] w-[50px]'
          src={Logo}
          alt='ROOM:IT 로고'
        />
      </Link>
      {isLogin && (
        <div className='relative'>
          <RiNotification3Line
            className='h-[24px] w-[24px] cursor-pointer'
            onClick={handleMoveToNotiPageClick}
          />
          {message?.type && message?.workplaceId && (
            <NotiContainer
              message={message.type}
              workplaceId={message.workplaceId}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default LogoAndNotification;
