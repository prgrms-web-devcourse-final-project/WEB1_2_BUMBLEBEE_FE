import { authInstance, defaultInstance } from '.';

interface StudyRoomData {
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  capacity: number;
}

interface StudyRoomPutData extends StudyRoomData {
  studyRoomId: number;
}

interface WorkplaceStudyRoomData {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  price: number;
  capacity: number;
}

interface SearchStudyRoom {
  workplaceAddress: string;
  startTime: string;
  endTime: string;
  capacity: number;
}

interface SearchStudyRoomData {
  workplaceName: string;
  averageReviewScore: number;
  studyRoomTitle: string;
  workplaceAddress: string;
  studyRoomCapacity: number;
  studyRoomPrice: number;
  imageUrl: string;
}

interface WorkPlaceData {
  workplaceName: string;
  WorkplacePhoneNumber: string;
  workplaceDescription: string;
  workplaceAddress: string;
  imageUrl: string;
  workplaceStartTime: string;
  workplaceEndTime: string;
}

interface WorkPlacePutData extends WorkPlaceData {
  workplaceId: number;
}

interface GetWorkPlaceData extends WorkPlacePutData {
  createdAt: string;
  longitude: string;
  latitude: string;
}

interface GetPositionWorkPlace {
  topLeft: { lat: number; lng: number };
  bottomRight: { lat: number; lng: number };
  positionLat: number;
  positionLng: number;
}

interface GetMainWorkPlaceData {
  workplaces: GetWorkPlaceData[];
}

interface GetBusinessWorkPlaceData {
  businessId: number;
  businessName: string;
  workplaces: GetWorkPlaceData[];
}

// 스터디룸 등록
export const postStudyRoom = async (
  studyroom: StudyRoomData,
): Promise<void> => {
  const response = await authInstance.post('api/v1/studyroom', studyroom);
  return response.data;
};

// 스터디룸 정보 수정
export const putStudyRoom = async (
  studyroom: StudyRoomPutData,
): Promise<void> => {
  const response = await authInstance.put('api/v1/studyroom', studyroom);
  return response.data;
};

// 스터디룸 삭제
export const deleteStudyRoom = async (studyRoomId: string): Promise<void> => {
  const response = await authInstance.delete(`api/v1/studyroom/${studyRoomId}`);
  return response.data;
};

// 사업장의 스터디룸 찾기
export const getWorkplaceStudyRoom = async (
  workplaceId: string,
): Promise<WorkplaceStudyRoomData[]> => {
  const response = await defaultInstance.get(
    `api/v1/studyroom/workplace/${workplaceId}`,
  );
  return response.data;
};

// 예약 가능한 스터디룸 찾기
export const getSearchStudyRoom = async (
  searchStudyRoom: SearchStudyRoom,
): Promise<SearchStudyRoomData[]> => {
  const response = await authInstance.get('api/v1/studyroom/search', {
    params: searchStudyRoom,
  });
  return response.data;
};

// 사업장 등록
export const postWorkPlace = async (
  workplace: WorkPlaceData,
): Promise<void> => {
  const response = await authInstance.post('api/v1/workplace', workplace);
  return response.data;
};

// 사업장 정보 수정
export const putWorkPlace = async (
  workplaceId: number,
  workplace: WorkPlacePutData,
): Promise<void> => {
  const response = await authInstance.put(
    `api/v1/workplace/${workplaceId}`,
    workplace,
  );
  return response.data;
};

// 사업장 삭제
export const deleteWorkPlace = async (workplaceId: number): Promise<void> => {
  const response = await authInstance.delete(`api/v1/workplace/${workplaceId}`);
  return response.data;
};

// 사업장 정보 조회
export const getWorkPlace = async (
  workplaceId: number,
): Promise<GetWorkPlaceData> => {
  const response = await defaultInstance.get(
    `api/v1/workplace/info/${workplaceId}`,
  );
  return response.data;
};

// 위치 기반 사업장 조회
export const getPositionWorkPlace = async (
  position: GetPositionWorkPlace,
): Promise<GetMainWorkPlaceData> => {
  const response = await defaultInstance.get('api/v1/workplace/distance', {
    params: position,
  });
  return response.data;
};

// 사업자 사업장 조회
export const getBusinessWorkPlace =
  async (): Promise<GetBusinessWorkPlaceData> => {
    const response = await authInstance.get('api/v1/workplace/business');
    return response.data;
  };
