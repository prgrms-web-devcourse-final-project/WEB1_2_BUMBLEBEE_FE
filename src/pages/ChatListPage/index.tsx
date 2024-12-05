import HeaderWithTitle from '@layouts/HeaderWithTitle';
import MainLayout from '@layouts/MainLayout';
import BottomNavigation from '@layouts/BottomNavigation';
import ChatCard from './components/ChatCard';
import useGetChatList from './hooks/useGetChatList';

const ChatListPage = () => {
  // const { data } = useGetChatList();
  // console.log(data);

  const data = [
    {
      roomId: 1,
      id: 1,
      name: 'eun309',
      updatedAt: '2024-12-02T12:30:00',
    },
  ];
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
        </div>
        <BottomNavigation />
      </MainLayout>
    </>
  );
};

export default ChatListPage;
