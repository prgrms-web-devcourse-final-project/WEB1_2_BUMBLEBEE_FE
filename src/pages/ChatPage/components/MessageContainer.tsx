import { useEffect, useRef } from 'react';
import { ChatMessageResponse } from '@typings/types';
import { getFormattedDateWeekFunction } from '@utils/formatTime';
import SendMessage from './SendMessage';
import ReceiveMessage from './ReceiveMessage';

interface MessageContainerProps {
  messages: ChatMessageResponse[];
  user: string;
}

const MessageContainer = (props: MessageContainerProps) => {
  const { messages, user } = props;

  // 날짜 별로 매핑
  const groupedMessages = messages.reduce<
    Record<string, ChatMessageResponse[]>
  >((acc, message) => {
    const messageDate = getFormattedDateWeekFunction(message.timestamp);
    if (!acc[messageDate]) {
      acc[messageDate] = [];
    }
    acc[messageDate].push(message);
    return acc;
  }, {});

  // 메시지 목록이 업데이트될 때마다 최하단으로 스크롤
  const messageEndRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    messageEndRef.current?.scrollIntoView({ behavior: 'auto' });
  }, [messages]);

  return (
    <>
      {messages &&
        messages.length > 0 &&
        Object.entries(groupedMessages).map(([date, dateMessages], index) => (
          <div
            key={index}
            className='mb-4 mt-8 flex w-custom flex-col items-center justify-end gap-5'
          >
            <div className='text-xs text-subfont underline'>{date}</div>

            {dateMessages.map((message, idx) =>
              message.sender === user ? (
                <SendMessage
                  key={idx}
                  message={message}
                />
              ) : (
                <ReceiveMessage
                  key={idx}
                  message={message}
                />
              ),
            )}
          </div>
        ))}
      <div ref={messageEndRef} />
    </>
  );
};

export default MessageContainer;
