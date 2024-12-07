import { getChatListBusiness, getChatListMember } from '@apis/chat';
import { useQuery } from '@tanstack/react-query';
import { ChatListBusiness, ChatListMember } from '@typings/types';
import { getRole } from '@utils/auth';

const useGetChatList = () => {
  const role = getRole();
  const queryKey = ['chatList'];
  const queryFn =
    role === 'ROLE_USER' ? getChatListMember : getChatListBusiness;
  const { data, isLoading, isError } = useQuery<
    ChatListMember[] | ChatListBusiness[]
  >({ queryKey, queryFn });

  return { data: data ?? [], isLoading, isError };
};

export default useGetChatList;
