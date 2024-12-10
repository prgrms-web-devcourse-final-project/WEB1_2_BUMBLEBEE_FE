import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useEffect, useState } from 'react';
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
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트

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

  // 채팅 내용 불러오기
  const loadMessage = async () => {
    const messageList = await getMessage(Number(roomId));
    setMessages(messageList);
  };

  // 소켓 연결
  const connect = () => {
    try {
      const client = new Client({
        brokerURL: WS_URL,
        webSocketFactory: () => new SockJS(WS_URL),
        reconnectDelay: 5000, // 자동 재연결
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
      };

      client.activate();
      setStompClient(client);
    } catch (err) {
      toast.error('오류가 발생했습니다.');
    }
  };

  const disConnect = () => {
    // 연결 끊기
    if (stompClient === null) {
      return;
    }
    stompClient.deactivate();
  };

  const sendMessage = (inputValue: string) => {
    if (stompClient && stompClient.connected && inputValue) {
      const chatMessage: SendMessageRequest = {
        sender: user,
        content: inputValue,
        roomId: parseInt(roomId || '', 10),
        timestamp: getDatetoLocalDate(new Date()),
        senderType: role === 'ROLE_USER' ? 'MEMBER' : 'BUSINESS',
      };

      stompClient.publish({
        destination: '/pub/sendMessage',
        body: JSON.stringify(chatMessage),
      });
    }
  };

  useEffect(() => {
    getUserNickName();
    loadMessage();
    connect();
    return () => disConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomId]);

  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title={chatTitle} />
        <div className='fixed left-1/2 top-[93px] flex h-[calc(100vh-93px-94px)] w-custom -translate-x-1/2 overflow-hidden'>
          <div className='overflow-y-auto'>
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
