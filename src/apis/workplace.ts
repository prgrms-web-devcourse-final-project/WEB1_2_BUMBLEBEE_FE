import {
  GetBusinessWorkPlaceData,
  GetPositionWorkPlace,
  GetPositionWorkPlaceData,
  GetWorkPlaceData,
  SearchStudyRoom,
  SearchStudyRoomData,
  StudyRoomData,
  StudyRoomPutData,
  WorkPlaceData,
  WorkPlacePutData,
  WorkplaceStudyRoomData,
} from '@typings/types';
import { authInstance, defaultInstance } from '.';

// 프리사인드 URL 얻기
export const getS3URL = async (): Promise<string> => {
  const response = await authInstance.get('/api/generate-presigned-url');
  return response.data;
};

// 스터디룸 등록
export const postStudyRoom = async (
  studyroom: StudyRoomData,
): Promise<void> => {
  const response = await authInstance.post('/api/v1/studyroom', studyroom);
  return response.data;
};

// 스터디룸 정보 수정
export const putStudyRoom = async (
  studyroom: StudyRoomPutData,
): Promise<void> => {
  const response = await authInstance.put('/api/v1/studyroom', studyroom);
  return response.data;
};

// 스터디룸 삭제
export const deleteStudyRoom = async (studyRoomId: string): Promise<void> => {
  const response = await authInstance.delete(
    `/api/v1/studyroom/${studyRoomId}`,
  );
  return response.data;
};

// 사업장의 스터디룸 찾기
export const getWorkplaceStudyRoom = async (
  workplaceId: number,
): Promise<WorkplaceStudyRoomData[]> => {
  const response = await defaultInstance.get(
    `/api/v1/studyroom/workplace/${workplaceId}`,
  );
  return response.data;
};

// 예약 가능한 스터디룸 찾기
export const getSearchStudyRoom = async (
  searchStudyRoom: SearchStudyRoom,
): Promise<SearchStudyRoomData[]> => {
  const response = await authInstance.get('/api/v1/studyroom/search', {
    params: searchStudyRoom,
  });
  return response.data;
};

// 사업장 등록
export const postWorkPlace = async (
  workplace: WorkPlaceData,
): Promise<void> => {
  const response = await authInstance.post('/api/v1/workplace', workplace);
  return response.data;
};

// 사업장 정보 수정
export const putWorkPlace = async (
  workplaceId: number,
  workplace: WorkPlacePutData,
): Promise<void> => {
  const response = await authInstance.put(
    `/api/v1/workplace/${workplaceId}`,
    workplace,
  );
  return response.data;
};

// 사업장 삭제
export const deleteWorkPlace = async (workplaceId: number): Promise<void> => {
  const response = await authInstance.delete(
    `/api/v1/workplace/${workplaceId}`,
  );
  return response.data;
};

// 사업장 정보 조회
export const getWorkPlace = async (
  workplaceId: number,
): Promise<GetWorkPlaceData> => {
  const response = await defaultInstance.get(
    `/api/v1/workplace/info/${workplaceId}`,
  );
  return response.data;
};

// 위치 기반 사업장 조회
export const getPositionWorkPlace = async (
  position: GetPositionWorkPlace,
): Promise<GetPositionWorkPlaceData> => {
  const response = await defaultInstance.get('/api/v1/workplace/distance', {
    params: position,
  });
  return response.data;
};

// 사업자 사업장 조회
export const getBusinessWorkPlace =
  async (): Promise<GetBusinessWorkPlaceData> => {
    const response = await authInstance.get('/api/v1/workplace/business');
    return response.data;
  };
