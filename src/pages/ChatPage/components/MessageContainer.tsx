import { useEffect, useRef } from 'react';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';

const MessageContainer = () => {
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, []);
  return (
    <div className='mt-4 flex h-full flex-col items-center gap-5'>
      <div className='text-xs text-subfont underline'>2024.11.14 목요일</div>
      <SendMessage />
      <ReceiveMessage />
      <SendMessage />
      <ReceiveMessage />
      <SendMessage />
      <ReceiveMessage />
      <SendMessage />
      <ReceiveMessage />
      <SendMessage />
      <ReceiveMessage />
      <div ref={messageEndRef} />
    </div>
  );
};

export default MessageContainer;
