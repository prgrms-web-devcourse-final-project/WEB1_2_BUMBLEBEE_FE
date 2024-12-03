import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import ChatCard from './components/ChatCard';

const ChatListPage = () => {
  return (
    <>
      <MainLayout headerType='both'>
        <HeaderWithTitle title='채팅 목록' />
        <div className='mt-4 flex h-auto flex-col items-center gap-4 pb-[110px]'>
          <ChatCard />
          <ChatCard />
          <ChatCard />
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default ChatListPage;
