import { SseAlarm } from '@typings/types';

const NotiContainer = ({ message }: { message: SseAlarm }) => {
  return <div className='h-[50px] w-custom bg-primary'>{message.content}</div>;
};

export default NotiContainer;
