import { FormEvent, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage('');
  };

  return (
    <div className='fixed bottom-0 z-10 flex h-[94px] w-[375px] items-center justify-between border-t-[1px] border-t-subfont bg-white px-4 pb-4 pt-[18px]'>
      <form
        className='flex w-[343px] items-center justify-between'
        onSubmit={handleSubmit}
      >
        <input
          type='text'
          placeholder='메시지를 입력해주세요.'
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className='h-10 w-[300px] rounded-full bg-[#EEEEEE] px-4 py-[5px] text-sm focus:outline-none'
        />
        <button
          type='submit'
          className='flex h-7 w-7 items-center justify-center rounded-2xl bg-primary px-[7px] py-[7px] text-white'
        >
          <FaArrowUp />
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
