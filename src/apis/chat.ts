import { ChatMessageResponse } from '@typings/types';
import { authInstance } from '.';

export const getMessage = async (
  roomId: number,
): Promise<ChatMessageResponse[]> => {
  const response = await authInstance.get(`api/v1/chat/room/${roomId}`);
  return response.data;
};

export default getMessage;
