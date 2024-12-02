import HeaderOnlyTitle from '@layouts/HeaderOnlyTitle';
import MainLayout from '@layouts/MainLayout';
import MessageInput from './components/MessageInput';
import MessageContainer from './components/MessageContainer';

const ChatPage = () => {
  return (
    <>
      <MainLayout>
        <HeaderOnlyTitle title='ABC 스터디룸' />
        <div className='fixed left-1/2 top-[93px] mb-4 flex h-[calc(100vh-93px-94px-16px)] w-custom -translate-x-1/2 overflow-hidden'>
          <div className='overflow-y-auto'>
            <MessageContainer />
          </div>
        </div>
        <MessageInput />
      </MainLayout>
    </>
  );
};

export default ChatPage;
