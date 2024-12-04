import {
  ChatListBusiness,
  ChatListMember,
  ChatMessageResponse,
} from '@typings/types';
import { authInstance } from '.';

// 메시지 기록 조회
export const getMessage = async (
  roomId: number,
): Promise<ChatMessageResponse[]> => {
  const response = await authInstance.get(`api/v1/chat/room/${roomId}`);
  return response.data;
};

// 채팅방 목록 조회 (사용자)
export const getChatListMember = async (): Promise<ChatListMember> => {
  const response = await authInstance.get('/api/v1/chat/room');
  return response.data;
};

// 채팅방 목록 조회 (사업자)
export const getChatListBusiness = async (): Promise<ChatListBusiness> => {
  const response = await authInstance.get('/api/v1/chat/room');
  return response.data;
};
