import { ChatMessageResponse } from '@typings/types';

interface SendMessageProps {
  message: ChatMessageResponse;
}

const SendMessage = (props: SendMessageProps) => {
  const { message } = props;
  const formattedTime = message.timestamp
    .split('T')[1]
    .split(':')
    .slice(0, 2)
    .join(':');
  return (
    <div className='flex w-custom justify-end'>
      <div className='flex items-end gap-2'>
        <div>
          {!message.isRead && (
            <p className='text-end text-xs text-primary'>1</p>
          )}
          <p className='text-xs text-subfont'>{formattedTime}</p>
        </div>
        <div className='max-w-60 rounded-t-xl rounded-bl-xl bg-primary px-3 py-2 text-sm text-white'>
          {message.content}
        </div>
      </div>
    </div>
  );
};

export default SendMessage;
