import { useEffect, useRef } from 'react';
import { ChatMessageResponse } from '@typings/types';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';

interface MessageContainerProps {
  messages: ChatMessageResponse[];
  user: string;
}

const MessageContainer = (props: MessageContainerProps) => {
  const { messages, user } = props;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  // const messages = [
  //   {
  //     messageId: 101,
  //     roomId: 1,
  //     sender: 'JohnDoe',
  //     content: 'Hello, World!',
  //     timestamp: '2024-12-02T12:30:00',
  //   },
  //   {
  //     messageId: 102,
  //     roomId: 1,
  //     sender: 'JaneDoe',
  //     content: 'Hi, John!',
  //     timestamp: '2024-12-02T12:32:00',
  //   },
  //   {
  //     messageId: 102,
  //     roomId: 1,
  //     sender: 'JaneDoe',
  //     content: 'Hi, John!',
  //     timestamp: '2024-12-02T12:32:00',
  //   },
  //   {
  //     messageId: 102,
  //     roomId: 1,
  //     sender: 'JaneDoe',
  //     content: 'Hi, John!',
  //     timestamp: '2024-12-02T12:32:00',
  //   },
  //   {
  //     messageId: 102,
  //     roomId: 1,
  //     sender: 'JaneDoe',
  //     content: 'Hi, John!',
  //     timestamp: '2024-12-02T12:32:00',
  //   },
  //   {
  //     messageId: 102,
  //     roomId: 1,
  //     sender: 'JaneDoe',
  //     content: 'Hi, John!',
  //     timestamp: '2024-12-02T12:32:00',
  //   },
  //   {
  //     messageId: 102,
  //     roomId: 1,
  //     sender: 'JaneDoe',
  //     content: 'Hi, John!',
  //     timestamp: '2024-12-02T12:32:00',
  //   },
  // ];
  // 메시지 목록이 업데이트될 때마다 최하단으로 스크롤
  const messageEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className='mt-4 flex h-full w-custom flex-col items-center justify-end gap-5'>
      <div className='text-xs text-subfont underline'>2024.11.14 목요일</div>
      {messages &&
        messages.length > 0 &&
        messages.map((message) => {
          if (message.sender === user) {
            return (
              <SendMessage
                key={message.messageId}
                message={message}
              />
            );
          }
          return (
            <ReceiveMessage
              key={message.messageId}
              message={message}
            />
          );
        })}
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
