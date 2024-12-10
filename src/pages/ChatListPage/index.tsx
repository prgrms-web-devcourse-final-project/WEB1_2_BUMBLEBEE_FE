import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import ChatCard from './components/ChatCard';
import useGetChatList from './hooks/useGetChatList';

const ChatListPage = () => {
  const { data } = useGetChatList();
  return (
    <>
      <MainLayout headerType='both'>
        <HeaderWithTitle title='채팅 목록' />
        <div className='mt-4 flex h-auto flex-col items-center gap-4 pb-[110px]'>
          {data &&
            data.length > 0 &&
            data.map((chat) => (
              <ChatCard
                key={chat.roomId}
                chat={chat}
              />
            ))}
          {data && data.length === 0 && (
            <div className='flex h-[calc(100vh-112px-94px)] w-full items-center justify-center text-[14px] font-normal text-subfont'>
              채팅 목록이 비어있습니다.
            </div>
          )}
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default ChatListPage;
