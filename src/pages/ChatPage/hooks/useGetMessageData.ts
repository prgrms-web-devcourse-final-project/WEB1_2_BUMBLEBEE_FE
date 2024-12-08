import { getMessage } from '@apis/chat';
import { useQuery } from '@tanstack/react-query';
import { ChatMessageResponse } from '@typings/types';

const useGetMessageData = (roomId: number) => {
  const { data, isLoading, isError, refetch } = useQuery<ChatMessageResponse[]>(
    {
      queryKey: ['searchStudyRoom', roomId],
      queryFn: () => getMessage(roomId),
    },
  );

  return {
    data: (data ?? []) as ChatMessageResponse[],
    isLoading,
    isError,
    refetch,
  };
};

export default useGetMessageData;
