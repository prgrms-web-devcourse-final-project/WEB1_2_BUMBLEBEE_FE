import {
  ChatListBusiness,
  ChatListMember,
  ChatListResponse,
  ChatMessageResponse,
} from '@typings/types';
import { authInstance } from '.';

// 메시지 기록 조회
export const getMessage = async (
  roomId: number,
): Promise<ChatMessageResponse[]> => {
  const response = await authInstance.get(`/api/v1/chat/room/${roomId}`);
  return response.data;
};

// 채팅방 목록 조회
export const getChatList = async (): Promise<ChatListResponse[]> => {
  const response = await authInstance.get('/api/v1/chat/room');
  return response.data;
};

// 채팅방 생성 요청
export const postCreateChatRoom = async (
  studyRoomId: number,
): Promise<number> => {
  const response = await authInstance.post('/api/v1/chat/create', studyRoomId);
  return response.data;
};
