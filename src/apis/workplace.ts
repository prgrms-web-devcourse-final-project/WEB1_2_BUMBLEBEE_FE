import {
  BusinessWorkplacesData,
  GetPositionWorkPlaceData,
  GetWorkPlaceData,
  MapPosition,
  NowPosition,
  PossibleTime,
  SearchStudyRoom,
  SearchStudyRoomData,
  StudyRoomData,
  StudyRoomDetailData,
  WorkPlaceData,
  WorkPlacePutData,
  WorkplaceStudyRoomData,
} from '@typings/types';
import { authInstance, defaultInstance } from '.';

// 프리사인드 URL 얻기
export const getS3URL = async (
  fileName: string,
  fileLocation: string,
): Promise<string> => {
  const response = await authInstance.get('/api/generate-presigned-url', {
    params: { fileName, fileLocation },
  });
  return response.data.presignedUrl;
};

// 스터디룸 등록
export const postStudyRoom = async (
  workPlaceId: string,
  studyroom: StudyRoomData,
): Promise<{ studyroomId: number }> => {
  const response = await authInstance.post(
    `/api/v1/studyroom/${workPlaceId}`,
    studyroom,
  );
  return response.data;
};

// 스터디룸 정보 수정
export const putStudyRoom = (
  studyRoomId: string,
  studyroom: StudyRoomData,
): Promise<void> => {
  return authInstance.put(`/api/v1/studyroom/${studyRoomId}`, studyroom);
};

// 스터디룸 삭제
export const deleteStudyRoom = async (studyRoomId: string): Promise<void> => {
  return authInstance.delete(`/api/v1/studyroom/${studyRoomId}`);
};

// 스터디룸 이미지 삭제
export const deleteStudyRoomImage = async (
  fileName: string,
  fileLocation: string,
): Promise<void> => {
  await authInstance.delete(`/api/delete-object`, {
    params: { fileName, fileLocation },
  });
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
export const postSearchStudyRoom = async (
  searchStudyRoom: SearchStudyRoom,
): Promise<SearchStudyRoomData[]> => {
  const response = await defaultInstance.post(
    '/api/v1/studyroom/available',
    searchStudyRoom,
  );
  return response.data;
};

// 사업장 등록
export const postWorkPlace = async (
  workplace: WorkPlaceData,
): Promise<{
  workplaceId: number;
  studyroomId: number[];
}> => {
  const response = await authInstance.post('/api/v1/workplace', workplace);
  return response.data;
};

// 사업장 정보 수정
export const putWorkPlace = async ({
  workplaceId,
  workplace,
}: {
  workplaceId: number;
  workplace: WorkPlacePutData;
}): Promise<void> => {
  await authInstance.put(`/api/v1/workplace/${workplaceId}`, workplace);
};

// 사업장 삭제
export const deleteWorkPlace = async (workplaceId: number): Promise<void> => {
  const response = await authInstance.delete(
    `/api/v1/workplace/${workplaceId}`,
  );
  return response.data;
};

// 사업장 삭제 시 이미지 삭제
export const deleteWorkPlaceImage = async (
  fileLocation: string,
): Promise<void> => {
  await authInstance.delete(`/api/delete-folder`, {
    params: { fileLocation },
  });
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
export const postPositionWorkPlace = async ({
  nowPosition,
  mapPosition,
}: {
  nowPosition: NowPosition;
  mapPosition: MapPosition;
}): Promise<GetPositionWorkPlaceData[]> => {
  const response = await defaultInstance.post('/api/v1/workplace/distance', {
    topRight: {
      lat: mapPosition.topRight.lat,
      lng: mapPosition.topRight.lng,
    },
    bottomLeft: {
      lat: mapPosition.bottomLeft.lat,
      lng: mapPosition.bottomLeft.lng,
    },
    latitude: nowPosition.latitude,
    longitude: nowPosition.longitude,
  });
  return response.data;
};

// 하이브리드 필터링 사업장 조회
export const getRecommendWorkPlace = async (): Promise<
  GetPositionWorkPlaceData[]
> => {
  const response = await authInstance.post('/api/v1/recommend');
  return response.data;
};

// 사업자 사업장 조회
export const getBusinessWorkPlace =
  async (): Promise<BusinessWorkplacesData> => {
    const response = await authInstance.get('/api/v1/workplace/business');
    return response.data;
  };

// 스터디룸 상세 정보 조회
export const getStudyroomDetail = async (
  studyRoomId: number,
): Promise<StudyRoomDetailData> => {
  const response = await defaultInstance.get(
    `/api/v1/studyroom/${studyRoomId}`,
  );
  return response.data;
};

// 스터디룸의 예약 가능한 시간대 조회
export const getPossibleTime = async (
  studyRoomId: number,
  checkDate: Date,
): Promise<PossibleTime> => {
  const formattedDate = `${checkDate.getFullYear()}-${(checkDate.getMonth() + 1).toString().padStart(2, '0')}-${checkDate.getDate().toString().padStart(2, '0')}`;
  const response = await defaultInstance.get(
    `api/v1/studyroom/search/${studyRoomId}`,
    {
      params: { checkDate: formattedDate },
    },
  );
  return response.data;
};
