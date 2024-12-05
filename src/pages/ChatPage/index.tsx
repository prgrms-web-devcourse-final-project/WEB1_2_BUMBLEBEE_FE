import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import { useEffect, useState } from 'react';
import { Client, IMessage } from '@stomp/stompjs';
import { useLocation, useParams } from 'react-router-dom';
import { ChatMessageResponse, SendMessageRequest } from '@typings/types';
import { getMessage } from '@apis/chat';
import SockJS from 'sockjs-client';
import { WS_URL } from '@constants/constants';
import MessageInput from './components/MessageInput';
import MessageContainer from './components/MessageContainer';

const ChatPage = () => {
  const location = useLocation();
  const user = location.state;
  const { roomId } = useParams();
  const [messages, setMessages] = useState<ChatMessageResponse[]>([]); // 메시지 리스트
  const [stompClient, setStompClient] = useState<Client | null>(null); // STOMP 클라이언트

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
        console.log('Connected');
        client.subscribe(`/sub/chat/room/${roomId}`, (message: IMessage) => {
          try {
            const newMessage = JSON.parse(message.body);
            setMessages((prevMessages) => [...prevMessages, newMessage]);
            console.log('완료');
          } catch (error) {
            console.error('오류가 발생했습니다:', error);
          }
        });
      };

      client.activate();
      setStompClient(client);
    } catch (err) {
      console.error(err);
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
        timestamp: new Date().toISOString(),
        senderType: 'member',
      };
      stompClient.publish({
        destination: '/pub/sendMessage',
        body: JSON.stringify(chatMessage),
      });
    }
  };

  useEffect(() => {
    loadMessage();

    connect();
    return () => disConnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='ABC 스터디룸' />
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
