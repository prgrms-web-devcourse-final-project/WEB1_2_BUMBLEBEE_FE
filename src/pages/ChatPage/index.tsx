import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useEffect, useRef, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { useLocation, useParams } from 'react-router-dom';
import {
  Business,
  ChatMessageResponse,
  Member,
  SendMessageRequest,
} from '@typings/types';
import { getMessage } from '@apis/chat';
import SockJS from 'sockjs-client';
import { WS_URL } from '@constants/constants';
import { getRole } from '@utils/auth';
import { getUserData } from '@apis/member';
import { getBusinessData } from '@apis/business';
import { getDatetoLocalDate } from '@utils/formatTime';
import { toast } from 'react-toastify';
import MessageInput from './components/MessageInput';
import MessageContainer from './components/MessageContainer';

const ChatPage = () => {
  const location = useLocation();
  const chatTitle = location.state;
  const { roomId } = useParams();
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]); // 메시지 리스트
  const stompClientRef = useRef<Client | null>(null);

  const role = getRole();
  const [user, setUser] = useState<string>('');

  const getUserNickName = async () => {
    const userResponse =
      role === 'ROLE_USER' ? await getUserData() : await getBusinessData();

    if (role === 'ROLE_USER') {
      setUser((userResponse as Member).nickName);
    } else {
      setUser((userResponse as Business).businessName);
    }
  };

  console.log(stompClientRef);

  // 채팅 내용 불러오기
  const loadMessage = async (cursor?: string) => {
    try {
      const messageList = await getMessage(Number(roomId), cursor);
      setMessages((prevMessages) => [...messageList, ...prevMessages]);
    } catch (error) {
      toast.error('메시지를 불러오는 중 오류가 발생했습니다.');
    }
  };

  // 채팅 무한 스크롤
  const loadMoreMessages = () => {
    if (messages.length > 0) {
      const lastMessageTimestamp = messages[0].timestamp; // 첫 번째 메시지의 타임스탬프 사용
      loadMessage(lastMessageTimestamp);
    }
  };

  // 소켓 연결
  const connect = () => {
    try {
      const client = new Client({
        brokerURL: WS_URL,
        webSocketFactory: () => new SockJS(WS_URL),
        reconnectDelay: 5000, // 자동 재연결
        connectHeaders: {
          nickName: user,
          senderType: role === 'ROLE_USER' ? 'MEMBER' : 'BUSINESS',
          chatRoomId: roomId as string,
        },
      });

      // 구독
      client.onConnect = () => {
        client.subscribe(`/sub/chat/${roomId}`, (message: IMessage) => {
          try {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
          } catch (error) {
            toast.error('오류가 발생했습니다.');
          }
        });

        client.subscribe(`/sub/chat/connect/${roomId}`, (message: IMessage) => {
          const newMessage = JSON.parse(message.body);
          if (newMessage.type === 'CONNECT') {
            setMessages((prevMessages) =>
              prevMessages.map((msg) => ({
                ...msg,
                isRead: true,
              })),
            );
          }
        });
      };

      client.activate();
      stompClientRef.current = client;
    } catch (err) {
      toast.error('오류가 발생했습니다.');
    }
  };

  const disConnect = async () => {
    // 연결 끊기
    if (!stompClientRef.current) {
      return;
    }

    await stompClientRef.current.deactivate();
    stompClientRef.current = null;
  };

  const sendMessage = (inputValue: string) => {
    if (
      stompClientRef.current &&
      stompClientRef.current.connected &&
      inputValue
    ) {
      const chatMessage: SendMessageRequest = {
        sender: user,
        content: inputValue,
        roomId: parseInt(roomId || '', 10),
        timestamp: getDatetoLocalDate(new Date()),
        senderType: role === 'ROLE_USER' ? 'MEMBER' : 'BUSINESS',
      };

      stompClientRef.current.publish({
        destination: '/pub/sendMessage',
        body: JSON.stringify(chatMessage),
        headers: {
          nickName: user,
          senderType: role === 'ROLE_USER' ? 'MEMBER' : 'BUSINESS',
          chatRoomId: roomId as string,
        },
      });
    }
  };

  useEffect(() => {
    getUserNickName();

    if (user !== '') {
      loadMessage();
      connect();
    }

    return () => {
      if (stompClientRef.current) {
        disConnect(); // 컴포넌트 언마운트 시 STOMP 연결 해제
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title={chatTitle} />
        <div className='fixed left-1/2 top-[93px] flex h-[calc(100vh-93px-94px)] w-custom -translate-x-1/2 overflow-hidden'>
          <div
            className='overflow-y-auto'
            onScroll={(e) => {
              const target = e.target as HTMLDivElement;
              if (target.scrollTop === 0) {
                loadMoreMessages();
              }
            }}
          >
            <MessageContainer
              messages={messages}
              user={user}
            />
          </div>
        </div>
        <MessageInput OnSendMessage={sendMessage} />
      </MainLayout>
    </>
  );
};

export default ChatPage;
