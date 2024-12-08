import { ChatMessageResponse } from '@typings/types';

interface ReceiveMessageProps {
  message: ChatMessageResponse;
}

const ReceiveMessage = (props: ReceiveMessageProps) => {
  const { message } = props;
  const formattedTime = message.timestamp
    .split('T')[1]
    .split(':')
    .slice(0, 2)
    .join(':');
  return (
    <div className='flex w-custom justify-start'>
      <div className='flex items-end gap-2'>
        <div className='max-w-60 rounded-t-xl rounded-br-xl bg-[#EEEEEE] px-3 py-2 text-sm'>
          {message.content}
        </div>
        <p className='text-xs text-subfont'>{formattedTime}</p>
      </div>
    </div>
  );
};

export default ReceiveMessage;
