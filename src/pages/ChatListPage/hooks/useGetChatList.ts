import { getChatList } from '@apis/chat';
import { useQuery } from '@tanstack/react-query';
import { ChatListResponse } from '@typings/types';

const useGetChatList = () => {
  const { data, isLoading, isError } = useQuery<ChatListResponse[]>({
    queryKey: ['chatList'],
    queryFn: () => getChatList(),
  });

  return { data: data ?? [], isLoading, isError };
};

export default useGetChatList;
